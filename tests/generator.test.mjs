import test from 'ava'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import fsx from 'fs-extra'
import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { promise } from '@jsonql/utils'

const __dirname = getDirname(import.meta.url)
const expectedFile = join(__dirname, '..', 'src', 'generators', 'hello-world.mjs')

test.after(async () => {
  await fsx.remove(expectedFile)
})

test('Should able to create genrator with the generator', async t => {
  t.plan(1)
  return promise((resolve) => {
    const ls = spawn('pnpm', ['dev', 'createGenerator', '"hello world"', 'whatever'])
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      setTimeout(() => {
        t.true(fsx.existsSync(expectedFile))
        resolve(true)
      }, 300)
    })
  })
})
