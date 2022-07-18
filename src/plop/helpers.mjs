import { join } from 'node:path'
/** wrap all the helpers in one call, then register them all */
export function registerHelpers (plop, config) {
  const { __dirname } = config
  // const TEMPLATE_DIR = join(__dirname, 'tpl', 'plop')
  const SRC_DIR = join(__dirname, 'src')
  // const TEST_DIR = join(__dirname, 'tests', 'unit')
  const VIEWS_DIR = join(SRC_DIR, 'views')
  const COMPS_DIR = join(SRC_DIR, 'components')
  // const STORE_DIR = join(SRC_DIR, 'store')
  // const I18N_DIR = join(SRC_DIR, 'i18n')

  // instead of try to escape the double curly we just create a helper to generate it
  plop.setHelper('dcurly', (_, open) => open ? '{{' : '}}')
  // prepend the parent view name to the component test file name
  plop.setHelper('prependIfSub', (text) => text ? text + '.' : '')
  // if its under the view then it should be under the view directory or the components
  plop.setHelper('getComponentPath', (text) => text ? join(VIEWS_DIR, text) : COMPS_DIR)
  // get the component type (directory)
  plop.setHelper('getComponentType', (text) => text === 'sub' ? 'views' : 'components')
  // create a all lowercase prefix with _ for scss file name
  plop.setHelper('createScssFileName', (text) => {
    const camelCase = plop.getHelper('camelCase')
    const lowerCase = plop.getHelper('lowerCase')

    return '_' + lowerCase(camelCase(text))
  })
}
