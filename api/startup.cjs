// Fichier de démarrage Passenger (Plesk). CommonJS car Passenger fait un require() et AdonisJS est en ESM.
// AdonisJS attrape lui-même ses erreurs de démarrage et ne fait que les écrire sur stderr : on garde
// donc stderr en mémoire et on l'écrit dans startup-error.log si le processus s'arrête en erreur.
const { appendFileSync } = require('node:fs')
const { join } = require('node:path')

const logFile = join(__dirname, 'startup-error.log')
const stderr = []
const write = process.stderr.write.bind(process.stderr)
process.stderr.write = (chunk, ...rest) => {
  stderr.push(String(chunk))
  if (stderr.length > 200) stderr.shift()
  return write(chunk, ...rest)
}

function save(reason) {
  try {
    appendFileSync(logFile, `[${new Date().toISOString()}] ${reason}\n${stderr.join('')}\n`)
  } catch {}
}

process.on('exit', (code) => {
  if (code !== 0) save(`arrêt avec le code ${code}`)
})

import('./build/bin/server.js').catch((error) => {
  console.error(error)
  process.exit(1)
})
