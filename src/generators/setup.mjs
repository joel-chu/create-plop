// setup generator create the init setup and the .create-plop.config.json file
/*
What do we need to know:
1. framework (only Vue at the moment) stub this with a message
2. version (2 or 3)
3. Lang TS or ESM
4. Using which store
5. What test framework (Support Jest, ava, and Vitest soon follow)
*/
import { createConfig } from '../helpers/config.mjs'

export default function setupGenerator (plop, config) {
  const { pwd, __dirname } = config

  plop.setGenerator('setupGenerator', {
    description: 'Initial setup',
    prompts: [
      {
        type: 'list',
        name: 'framework',
        choices: ['vue'],
        default: 'vue'
      },
      {
        type: 'list',
        name: 'version',
        choices: [2, 3],
        default: 1 // use the index when its number
      },
      {
        type: 'list',
        name: 'lang',
        choices: ['Typescript', 'Javascript'],
        default: 'Typescript'
      },
      {
        type: 'list',
        name: 'store',
        choices: ['vuex', 'pinia', 'none'],
        default: function (answers) {
          return answers.version === 2 ? 'vuex' : 'pinia'
        }
      },
      {
        type: 'list',
        name: 'test',
        choices: ['jest', 'ava'], // vitest
        default: 'jest'
      }
    ],
    actions: function (answers) {
      // copy over templates
      console.log(answers)
      return [
        () => createConfig(pwd, answers),
        
      ]
    }
  })
}
