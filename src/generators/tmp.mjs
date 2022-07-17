// tmp generator
import { join } from 'node:path'
import fsx from 'fs-extra'
import { extend } from '@jsonql/utils'
import debugFn from 'debug'

import { USERGUIDE } from '../helpers/constants.mjs'
import { checkPkgDeps } from '../helpers/check-pkg-deps.mjs'
import { tmpContinue } from '../plop/prompts.mjs'

const debug = debugFn('create-plop:tmp-generator')
// main
export default function tmpGenerator (config) {
  const { tplDir, pkgJsonFile, pkgJson, ourPkgJson, dest } = config

  return function (plop) {
    const deps = checkPkgDeps(pkgJson)
    if (deps.vue && deps.vue !== 2) {
      throw new Error(`We only support Vue.2 at the moment (you have v.${deps.vue}). Please check back in later release`)
    }

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
  }
}
