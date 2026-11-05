RUNTIME ?= podman
COMPOSE ?= $(RUNTIME) compose
API_RUN = $(COMPOSE) --profile api run --rm api

.PHONY: help install up down web-dev web-quality api-install api-migrate api-quality api-shell quality

help:
	@echo "make install       dépendances web + api"
	@echo "make up / down     MySQL + Mailpit de développement"
	@echo "make web-dev       serveur Astro (http://localhost:4321, styleguide sur /styleguide/)"
	@echo "make api-migrate   migrations MySQL"
	@echo "make quality       lint, types, tests, build et audits des deux applications"

install: api-install
	cd web && pnpm install

api-install:
	$(COMPOSE) --profile api build api
	$(API_RUN) composer install

up:
	$(COMPOSE) up -d mysql mailpit

down:
	$(COMPOSE) down

web-dev:
	cd web && pnpm dev

web-quality:
	cd web && pnpm quality

api-migrate: up
	$(API_RUN) php artisan migrate

api-quality:
	$(API_RUN) composer quality

api-shell:
	$(API_RUN) sh

quality: web-quality api-quality
