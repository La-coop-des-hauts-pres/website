RUNTIME ?= podman
MYSQL_PORT ?= $(or $(HAUTPRES_MYSQL_PORT),3306)
SMTP_PORT ?= $(or $(HAUTPRES_SMTP_PORT),1026)
MAILPIT_PORT ?= $(or $(HAUTPRES_MAILPIT_PORT),8026)

.PHONY: help install up down reset web-dev api-dev web-quality api-migrate api-quality quality

help:
	@echo "make install       dépendances web + api"
	@echo "make up / down     MySQL + Mailpit de développement (podman ; RUNTIME=docker pour Docker)"
	@echo "make reset         supprime les conteneurs et les données locales"
	@echo "make web-dev       serveur Astro (http://localhost:4321, styleguide sur /styleguide/)"
	@echo "make api-dev       serveur AdonisJS (http://localhost:3333/api/v1/health)"
	@echo "make api-migrate   migrations MySQL"
	@echo "make quality       lint, types, tests, build et audits des deux applications"

install:
	cd web && pnpm install
	cd api && pnpm install

up:
	@$(RUNTIME) start hautpres-mysql >/dev/null 2>&1 || $(RUNTIME) run -d --name hautpres-mysql \
		-e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=hautpres -e MYSQL_USER=hautpres -e MYSQL_PASSWORD=hautpres \
		-p $(MYSQL_PORT):3306 -v hautpres-mysql-data:/var/lib/mysql docker.io/library/mysql:8.4 >/dev/null
	@$(RUNTIME) start hautpres-mailpit >/dev/null 2>&1 || $(RUNTIME) run -d --name hautpres-mailpit \
		-p $(SMTP_PORT):1025 -p $(MAILPIT_PORT):8025 docker.io/axllent/mailpit:latest >/dev/null
	@printf 'Attente de MySQL'; until $(RUNTIME) exec hautpres-mysql mysqladmin ping -h 127.0.0.1 -uhautpres -phautpres --silent >/dev/null 2>&1; do printf '.'; sleep 2; done; echo ' prêt'

down:
	-$(RUNTIME) stop hautpres-mysql hautpres-mailpit

reset:
	-$(RUNTIME) rm -f hautpres-mysql hautpres-mailpit
	-$(RUNTIME) volume rm hautpres-mysql-data

web-dev:
	cd web && pnpm dev

api-dev: up
	cd api && pnpm dev

api-migrate: up
	cd api && node ace migration:run

web-quality:
	cd web && pnpm quality

api-quality: up
	cd api && pnpm quality

quality: web-quality api-quality
