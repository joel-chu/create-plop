// Internal plopfile
// plop file for all the commands
import { join } from 'node:path'
import fsx from 'fs-extra'
import debugFn from 'debug'
import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { PKG_FILE } from './src/helpers/constants.mjs'
// import { importPlopfile } from './src/import-plopfile.mjs'
// import { spaceInValue } from './src/common.mjs'
const __dirname = getDirname(import.meta.url)
const debug = debugFn('create-plop:plopfile')
const tplDir = join(__dirname, 'src', 'templates')
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
  const pkgJson = fsx.readJsonSync(join(dest, PKG_FILE))
  debug('pkgJson', pkgJson)
  // create the generator
  // @TODO add more framework support next
  plop.setGenerator('createPlop', {
    description: 'create-plop main',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Project Name'
      // validate: spaceInValue // @BUG this is broken!
    }, {
      type: 'list',
      name: 'lang',
      message: 'Select development langauge',
      choices: [
        { name: 'Javascript', value: 'js' },
        { name: 'Typescript', value: 'ts' }
      ],
      default: 'js'
    }],
    actions: function (answers) {
      debug('actions answers', answers)
    }
  })

  // create custom actions
  plop.setActionType('copyTemplates', function (answers, config, plop) {
    const { name, lang } = answers
    const d = lang === 'js' ? 'ssr-vue' : 'ssr-vue-ts'

    return fs.copy(
      join(tplDir, d),
      join(destDir, name),
      {
        overwrite: false,
        errorOnExist: true
      }
    ).then(() => `Project ${name} created`)
  })

  // setting up the package.json
  plop.setActionType('setupPackageJson', function (answers, config, plop) {
    console.log(answers)
    const { name } = answers
    const pkg = fs.readJsonSync(join(tplDir, 'package.tpl.json'))
    pkg.name = name
    fs.writeJsonSync(join(destDir, name, 'package.json'), pkg, { spaces: 2 })

    return 'package.json created'
  })

  plop.setActionType('copyVeloceConfig', function (answers) {
    return fs.copy(
      join(tplDir, 'veloce.config.tpl.js'),
      join(destDir, answers.name, 'veloce.config.js')
    )
  })

  plop.setActionType('justEndMessage', function () {
    return 'Setup completed, now please run "npm install" then run "npm run dev"'
  })

  // next we will try to import plopfile that is written by the developer
  // then import it here
  // importPlopfile(projectRoot, plop)
}
