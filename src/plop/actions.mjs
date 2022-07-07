import { join } from 'node:path'
import fs from 'fs-extra'
// main
export default function (plop) {
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
}
