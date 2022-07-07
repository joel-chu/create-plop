// read in the package.json then look up the deps
import { strToNum } from '@jsonql/utils'

export function checkPkgDeps (pkgJson) {
  const { dependencies } = pkgJson
  if (dependencies) {
    const hasVue = dependencies.vue
    const vueVersion = hasVue ? getVersion(hasVue) : null

    return {
      vue: vueVersion
    }
  }
  return false
}

/* extract and convert to number */
function getVersion (verStr) {
  let version = verStr ? verStr.substr(1, 2) : null
  version = version !== null ? strToNum(version) : null
  return version
}
