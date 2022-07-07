/**
 * plopfile.js (2021-08-12)
 *
 */
const { join } = require('path')
const fs = require('fs')

const TEMPLATE_DIR = join(__dirname, 'tpl', 'plop')
const SRC_DIR = join(__dirname, 'src')
const TEST_DIR = join(__dirname, 'tests', 'unit')

const VIEWS_DIR = join(SRC_DIR, 'views')
const COMPS_DIR = join(SRC_DIR, 'components')
const STORE_DIR = join(SRC_DIR, 'store')
const I18N_DIR = join(SRC_DIR, 'i18n')
// export
module.exports = function (plop) {
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

  // component allow to add under a view as well
  plop.setGenerator('component', {
    description: 'Generate a new component (can be sub too)',
    prompts: [
      {
        type: 'list',
        name: 'compType',
        choices: ['global', 'sub'],
        message: 'Is this a global or sub component?'
      },
      {
        type: 'list',
        name: 'parentViewName',
        default: '',
        when: function (answers) {
          return answers.compType === 'sub'
        },
        choices: function () {
          return fs.readdirSync(VIEWS_DIR)
        },
        // should we do a dynamic glob here?
        message: 'What is the name of the parent view'
      },
      {
        type: 'input',
        name: 'compName',
        message: 'What is the name of this component?'
      }
    ],
    actions: [
      {
        type: 'add',
        templateFile: join(TEMPLATE_DIR, 'component', 'base.tpl'),
        path: join('{{getComponentPath parentViewName}}', '{{pascalCase compName}}', '{{pascalCase compName}}.vue')
      },
      {
        type: 'add',
        templateFile: join(TEMPLATE_DIR, 'component', 'scss.tpl'),
        path: join('{{getComponentPath parentViewName}}', '{{pascalCase compName}}', '{{createScssFileName compName}}.scss')
      },
      {
        type: 'add',
        templateFile: join(TEMPLATE_DIR, 'component', 'test.tpl'),
        path: join(TEST_DIR, 'component', '{{prependIfSub parentViewName}}{{pascalCase compName}}.spec.js')
      },
      // @TODO we need to add the component to the view in the component prop as well
      {
        type: 'add',
        templateFile: join(TEMPLATE_DIR, 'i18n', 'base.tpl'),
        // default to en
        path: join(I18N_DIR, 'en', '{{dashCase compName}}.js')
      },
      {
        type: 'modify',
        template: `import {{camelCase compName}} from './{{dashCase compName}}';
/* DO_NOT_EDIT_BELOW_THIS_LINE */`,
        path: join(I18N_DIR, 'en', 'index.js'),
        pattern: '/* DO_NOT_EDIT_BELOW_THIS_LINE */'
      },
      {
        type: 'modify',
        template: `  {{camelCase compName}},
/* PLEASE_LEAVE_THIS_HERE */`,
        path: join(I18N_DIR, 'en', 'index.js'),
        pattern: '/* PLEASE_LEAVE_THIS_HERE */'
      }
    ]
  })

  // full view with add to router
  plop.setGenerator('view', {
    description: 'Generate a new view',
    prompts: [
      {
        type: 'input',
        name: 'viewName',
        message: 'What is the name of this view?'
      },
      {
        type: 'confirm',
        name: 'addRoute',
        message: 'Add this view to the routing table?',
        default: true
      }
    ],
    actions: function (answers, config, plop) {
      const actions = [
        {
          type: 'add',
          templateFile: join(TEMPLATE_DIR, 'view', 'base.tpl'),
          path: join(VIEWS_DIR, '{{pascalCase viewName}}', '{{pascalCase viewName}}.vue')
        },
        {
          type: 'add',
          templateFile: join(TEMPLATE_DIR, 'view', 'scss.tpl'),
          path: join(VIEWS_DIR, '{{pascalCase viewName}}', '{{createScssFileName viewName}}.scss')
        },
        {
          type: 'add',
          templateFile: join(TEMPLATE_DIR, 'view', 'test.tpl'),
          path: join(TEST_DIR, 'view', '{{pascalCase viewName}}.spec.js'),
          data: { type: 'views' }
        },
        {
          type: 'modify',
          template: `{
      path: '/{{dashCase viewName}}',
      name: '{{pascalCase viewName}}',
      text: $t('routes.{{camelCase viewName}}'),
      component: () => import('@/views/{{pascalCase viewName}}/{{pascalCase viewName}}.vue'),
  },
  /* DO NOT MODIFY THIS LINE AND BELOW */`,
          path: join(SRC_DIR, 'router', 'routes.js'),
          pattern: '/* DO NOT MODIFY THIS LINE AND BELOW */'
        },
        {
          type: 'add',
          templateFile: join(TEMPLATE_DIR, 'i18n', 'base.tpl'),
          // default to en
          path: join(I18N_DIR, 'en', '{{dashCase viewName}}.js')
        },
        {
          type: 'modify',
          template: `import {{camelCase viewName}} from './{{dashCase viewName}}';
  /* DO_NOT_EDIT_BELOW_THIS_LINE */`,
          path: join(I18N_DIR, 'en', 'index.js'),
          pattern: '/* DO_NOT_EDIT_BELOW_THIS_LINE */'
        },
        {
          type: 'modify',
          template: `  {{camelCase viewName}},
  /* PLEASE_LEAVE_THIS_HERE */`,
          path: join(I18N_DIR, 'en', 'index.js'),
          pattern: '/* PLEASE_LEAVE_THIS_HERE */'
        }
      ]
      const addToRoute = {
        type: 'modify',
        template: `  {{camelCase viewName}}: '{{viewName}}',
  /* INJECT_NEW_ROUTE_NAME_ABOVE */`,
        path: join(I18N_DIR, 'en', 'routes.js'),
        pattern: '/* INJECT_NEW_ROUTE_NAME_ABOVE */'
      }
      if (answers.addRoute) {
        actions.push(addToRoute)
      }
      return actions
    }

  })

  // create store
  plop.setGenerator('store', {
    description: 'Generate a new store',
    prompts: [
      {
        type: 'input',
        name: 'storeName',
        message: 'What is the name of the new store?'
      }
    ],
    actions: [
      {
        type: 'add',
        templateFile: join(TEMPLATE_DIR, 'store', 'base.tpl'),
        path: join(STORE_DIR, 'modules', '{{dashCase storeName}}.js')
      },
      {
        type: 'modify',
        template: `import {{camelCase storeName}} from './modules/{{dashCase storeName}}.js';
/* !!! DO_NOT_EDIT_HERE_AND_BELOW !!! */`,
        path: join(STORE_DIR, 'index.js'),
        pattern: '/* !!! DO_NOT_EDIT_HERE_AND_BELOW !!! */'
      },
      {
        type: 'modify',
        template: `    {{camelCase storeName}},
/* !!! DO_NOT_EDIT_THIS !!! */`,
        path: join(STORE_DIR, 'index.js'),
        pattern: '/* !!! DO_NOT_EDIT_THIS !!! */'
      },
      {
        type: 'add',
        templateFile: join(TEMPLATE_DIR, 'store', 'test.tpl'),
        path: join(TEST_DIR, 'store', '{{camelCase storeName}}.store.spec.js')
      }
    ]
  })
}
