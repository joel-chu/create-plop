#!/usr/bin/env node
import { join } from 'node:path'
import minimist from 'minimist'
import { Plop, run } from 'plop'
import debugFn from 'debug'
import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { isTest, isDev } from './src/helpers/constants.mjs'

const debug = debugFn('create-plop:index')
const args = process.argv.slice(2)
const argv = minimist(args)
const __dirname = getDirname(import.meta.url)

debug('argv', argv)

// The reason we set it here is because inside the plop have this prop
const dest = isTest || isDev ? join(__dirname, 'tests', 'fixtures', 'dev') : process.cwd()

Plop.prepare({
  cwd: argv.cwd,
  configPath: join(__dirname, 'plopfile.js'),
  preload: argv.preload || [],
  completion: argv.completion
}, env => Plop.execute(env, (env) => {
  debug('env', env)
  const options = {
    ...env,
    dest
  }

  return run(options, undefined, true)
}))
