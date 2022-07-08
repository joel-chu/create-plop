import test from 'ava'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import fsx from 'fs-extra'
import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { promise } from '@jsonql/utils'

const __dirname = getDirname(import.meta.url)
const target = join(__dirname, 'fixtures', 'dev', 'vue2')
const tplDir = join(target, 'tpl')
const plopFile = join(target, 'plopfile.js')

test.after(async () => {
  // clean up
  await fsx.remove(tplDir)
  await fsx.remove(plopFile)
})

test('It should able to answer yes and copy over the folder structure', async t => {
  t.plan(2)
  return promise((resolve) => {
    const ls = spawn('pnpm', ['dev', 'Y'])
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      setTimeout(() => {
        t.true(fsx.existsSync(plopFile))
        t.true(fsx.existsSync(tplDir))
        resolve()
      }, 300)
    })
  })
})
