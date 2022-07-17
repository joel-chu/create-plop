// where we store the templates etc on the project
export const BASE_DIR_NAME = '.plop'
export const CONFIG_FILE_NAME = '.create-plop.config.json'
export const PKG_FILE = 'package.json'
export const USERGUIDE = 'userguide.md'
// dynamic varaible therefore using camel case
export const isTest = process.env.NODE_ENV === 'test'
export const isDev = process.env.NODE_ENV === 'dev'
// use during development to switch between different setup
export const fakeDest = process.env.FAKE_DEST
