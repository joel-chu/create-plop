import test from 'ava'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import fsx from 'fs-extra'
import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { promise } from '@jsonql/utils'
import { USERGUIDE } from '../src/helpers/constants.mjs'

const __dirname = getDirname(import.meta.url)
const target = join(__dirname, 'fixtures', 'dev', 'vue2')
const tplDir = join(target, 'tpl')
const plopFile = join(target, 'plopfile.js')
const jsonFile = join(target, 'package.json')
const orgJsonFile = jsonFile.replace('.json', '-org.json')

test.after(async () => {
  // clean up
  await fsx.remove(tplDir)
  await fsx.remove(plopFile)
  // clean up the json files as well
  await fsx.copy(orgJsonFile, jsonFile)
  await fsx.remove(orgJsonFile)
  await fsx.remove(join(target, USERGUIDE))
})

test('It should able to answer yes and copy over the folder structure', async t => {
  t.plan(3)
  return promise((resolve) => {
    const ls = spawn('pnpm', ['dev', 'tmp', 'Y'])
    ls.on('close', (code) => {
      setTimeout(() => {
        t.true(fsx.existsSync(plopFile))
        t.true(fsx.existsSync(tplDir))
        t.true(fsx.existsSync(orgJsonFile))
        resolve()
      }, 300)
    })
  })
})
