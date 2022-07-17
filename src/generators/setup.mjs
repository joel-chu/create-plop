// setup generator create the init setup and the .create-plop.config.json file

export default function setupGenerator (config = {}) {
  return function (plop) {
    plop.setGenerator('initGenerator', {
      description: 'Initial setup',
      prompts: [],
      actions: []
    })
  }
}
