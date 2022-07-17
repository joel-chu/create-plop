// a generator to create generator :)
import { join } from 'node:path'

export default function createGenerator (config) {
  const { __dirname } = config
  return function (plop) {
    plop.setGenerator('createGenerator', {
      description: 'A generator to create generator',
      prompts: [{
        type: 'input',
        name: 'name'
      }],
      actions: [{
        type: 'add',
        path: join(__dirname, 'src', 'generators', '{{dashCase name}}.mjs'),
        template: join(__dirname, 'src', 'templates', 'plop', 'generator.hbs')
      }]
    })
  }
}
