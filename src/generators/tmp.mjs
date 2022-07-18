// tmp generator
import debugFn from 'debug'

import { checkPkgDeps } from '../helpers/check-pkg-deps.mjs'
import { tmpContinue } from '../plop/prompts.mjs'

import { copyTpl, copyUserGuide } from '../plop/copy-actions.mjs'
import { updateProjectPkgJson } from '../plop/update-pkg-action.mjs'

const debug = debugFn('create-plop:tmp-generator')
// main
export default function tmpGenerator (plop, config) {
  const { pkgJson } = config

  const deps = checkPkgDeps(pkgJson)
  if (deps.vue && deps.vue !== 2) {
    throw new Error(`We only support Vue.2 at the moment (you have v.${deps.vue}). Please check back in later release`)
  }

  plop.setGenerator('tmp', {
    description: 'tmp generator',
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
          return await copyTpl('vue2', config)
        },
        async function updatePackageJson () {
          return await updateProjectPkgJson(config)
        },
        async function copyUserGuideToDest () {
          return copyUserGuide(config)
        }
      ]
    }
  })
}
