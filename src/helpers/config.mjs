// setup config and read config
import { join } from 'node:path'
import fsx from 'fs-extra'
import { CONFIG_FILE_NAME } from './constants.mjs'

/* create the config */
export function createConfig (pwd, options) {
  return fsx.writeJsonSync(join(pwd, CONFIG_FILE_NAME), options, { spaces: 2 })
}

/* read the config, not throwing anything just return empty object */
export function useConfig (pwd) {
  const json = join(pwd, CONFIG_FILE_NAME)
  return fsx.existsSync(json) ? fsx.readJsonSync(json) : {}
}
