import { join } from 'node:path'
import fsx from 'fs-extra'
import { USERGUIDE } from '../helpers/constants.mjs'
/** copy over the templates to the project */
export async function copyTpl (projectType, config) {
  const { tplDir, dest } = config
  return await fsx.copy(join(tplDir, projectType), dest)
}

/** copy over the user guide @TODO add link to the project README */
export function copyUserGuide (config) {
  const { tplDir, dest } = config
  return fsx.copy(join(tplDir, USERGUIDE), join(dest, USERGUIDE))
    .then(() => 'All done! Just run `npm run plop`')
}
