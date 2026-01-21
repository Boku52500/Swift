import type { Config } from 'tailwindcss'
// Delegate to canonical JS config to prevent drift between files
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsConfig = require('./tailwind.config.js') as Config
export default jsConfig

