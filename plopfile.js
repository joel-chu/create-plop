// Internal plopfile
// plop file for all the commands
import { join } from 'node:path'
import fsx from 'fs-extra'
import debugFn from 'debug'
import { extend } from '@jsonql/utils'
import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { checkPkgDeps } from './src/helpers/check-pkg-deps.mjs'
import { PKG_FILE, USERGUIDE } from './src/helpers/constants.mjs'
import { tmpContinue } from './src/plop/prompts.mjs'
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
  const deps = checkPkgDeps(pkgJson)
  if (deps.vue && deps.vue !== 2) {
    throw new Error(`We only support Vue.2 at the moment (you have v.${deps.vue}). Please check back in later release`)
  }
  // debug('deps', deps)
  // main
  plop.setGenerator('createPlop', {
    description: 'create-plop main',
    prompts: [
      tmpContinue
    ],
    actions: function (answers) {
      debug('actions answers', answers)
      const { proceed } = answers
      if (!proceed) {
        return [function () { return 'Bye bye' }]
      }
      // copy over the whole folder content
      return [
        async function copyFiles () {
          return await fsx.copy(join(tplDir, 'vue2'), dest)
        },
        async function updatePackageJson () {
          // create a copy first
          await fsx.copy(pkgJsonFile, pkgJsonFile.replace('.json', '-org.json'))

          pkgJson.dependencies = extend(pkgJson.dependencies, { plop: ourPkgJson.dependencies.plop })
          pkgJson.scripts = extend(pkgJson.scripts, { plop: 'plop' })

          return fsx.writeJson(pkgJsonFile, pkgJson, { spaces: 2 })
        },
        async function copyUserGuide () {
          return fsx.copy(join(tplDir, USERGUIDE), join(dest, USERGUIDE))
            .then(() => 'All done! Just run `npm run plop`')
        }
      ]
    }
  })

  // next we will try to import plopfile that is written by the developer
  // then import it here
  // importPlopfile(projectRoot, plop)
}
