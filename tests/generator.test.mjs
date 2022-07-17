import test from 'ava'
import { spawn } from 'node:child_process'
import fsx from 'fs-extra'
import { getDirname } from '@jsonql/utils/dist/get-dirname.js'
import { promise } from '@jsonql/utils'

test.skip('Should able to create genrator with the generator', async t => {
  return promise((resolve) => {
    t.pass()
    resolve(true)
  })
})
