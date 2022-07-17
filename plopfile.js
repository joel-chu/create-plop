// Internal plopfile
// plop file for all the commands
import { join } from 'node:path'
import fsx from 'fs-extra'
import debugFn from 'debug'
// import generators
import tmpGenerator from './src/generators/tmp.mjs'
import createGenerator from './src/generators/create-generator.mjs'

import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { PKG_FILE } from './src/helpers/constants.mjs'
// import { importPlopfile } from './src/import-plopfile.mjs'
// import { spaceInValue } from './src/common.mjs'
const __dirname = getDirname(import.meta.url)
const debug = debugFn('create-plop:plopfile')
const tplDir = join(__dirname, 'src', 'templates')
const ourPkgJson = fsx.readJsonSync(join(__dirname, 'package.json'))

// const isTest = process.env.NODE_ENV === 'test'
// const destDir = isTest ? join(__dirname, 'tests', 'fixtures') : process.cwd()

// const projectRoot = isTest ? __dirname : process.cwd()
// @TODO scan the dest to see if there is any plopfile.js
// if yes then import it here and run within the method also
/*
Process:
- read the dest directory and find the package.json
- the project name will be re-use, also check if they have the target deps installed, then we can skip some of the questions
- After: copy the required template, generate a user manual

options:
- Lang: TS / JS
- Framework: Vue 2 / 3
- Feature: SPA / SSR (TBC is there any different?)
- State machine: VueX (Vue 2, default to 3, 3 default to 4) or Pinia
- anything else?
*/
// export
export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  const dest = plop.getDestBasePath()
  debug('dest', dest)
  const pkgJsonFile = join(dest, PKG_FILE)
  const pkgJson = fsx.existsSync(pkgJsonFile) ? fsx.readJsonSync(pkgJsonFile) : {}
  const config = { dest, pkgJsonFile, pkgJson, tplDir, ourPkgJson, __dirname }
  // debug('deps', deps)
  // main
  const generators = [tmpGenerator, createGenerator]
  generators.forEach(fn => {
    fn(plop, config)
  })

  // next we will try to import plopfile that is written by the developer
  // then import it here
  // importPlopfile(projectRoot, plop)
}
