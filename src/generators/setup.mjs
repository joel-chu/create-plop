// setup generator create the init setup and the .create-plop.config.json file
/*
What do we need to know:
1. framework (only Vue at the moment) stub this with a message
2. version (2 or 3)
3. Using which store
4. What test framework (Support Jest, ava, and Vitest soon follow)

*/
export default function setupGenerator (config = {}) {
  return function (plop) {
    plop.setGenerator('initGenerator', {
      description: 'Initial setup',
      prompts: [],
      actions: []
    })
  }
}
