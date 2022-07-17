// a generator to create generator :)
import { join } from 'node:path'

export default function createGenerator (plop, config) {
  const { __dirname } = config

  plop.setGenerator('createGenerator', {
    description: 'A generator to create generator',
    prompts: [{
      type: 'input',
      name: 'name'
    }, {
      type: 'input',
      name: 'description',
      default: function (answers) {
        return `${answers.name} generator description`
      }
    }],
    actions: [{
      type: 'add',
      path: join(__dirname, 'src', 'generators', '{{dashCase name}}.mjs'),
      templateFile: join(__dirname, 'src', 'templates', 'plop', 'generator.hbs')
    }]
  })
}
