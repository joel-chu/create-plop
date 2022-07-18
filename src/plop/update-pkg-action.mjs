// this has to written as function then add to the actions array
import fsx from 'fs-extra'
import { extend } from '@jsonql/utils'
/** update the project package.json to include plop dep */
export async function updateProjectPkgJson (config) {
  const { pkgJsonFile, ourPkgJson, pkgJson } = config
  // create a copy first
  await fsx.copy(pkgJsonFile, pkgJsonFile.replace('.json', '-org.json'))

  pkgJson.dependencies = extend(pkgJson.dependencies, { plop: ourPkgJson.dependencies.plop })
  pkgJson.scripts = extend(pkgJson.scripts, { plop: 'plop' })

  return fsx.writeJson(pkgJsonFile, pkgJson, { spaces: 2 })
}
