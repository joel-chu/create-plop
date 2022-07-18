// put the prompts here for use later
// This is just temporary solution until we release more version support
export const tmpContinue = {
  type: 'confirm',
  name: 'proceed',
  message: 'We only support Vue.2 at the moment, y to continue',
  default: true
}

export const lang = {
  type: 'list',
  name: 'lang',
  message: 'Select the langauge for development',
  choices: [
    { name: 'Javascript', value: 'js' },
    { name: 'Typescript', value: 'ts' }
  ],
  default: 'ts'
}
