#!/usr/bin/env node
import { join } from 'node:path'
import minimist from 'minimist'
import { Plop, run } from 'plop'

import getDirname from '@jsonql/utils/dist/get-dirname.js'

const args = process.argv.slice(2)
const argv = minimist(args)
const __dirname = getDirname(import.meta.url)

const dest = process.env.NODE_ENV === 'test' ? join(__dirname, 'tests', 'fixtures') : process.cwd()

Plop.prepare({
  cwd: argv.cwd,
  configPath: join(__dirname, 'plopfile.js'),
  preload: argv.preload || [],
  completion: argv.completion
}, env => Plop.execute(env, (env) => {
  const options = {
    ...env,
    dest
  }

  return run(options, undefined, true)
}))
