const CLIEngine = require('eslint').CLIEngine
const cli = new CLIEngine({
  useEslintrc: true,
  fix: true,
  allowInlineConfig: true
})
let formatter = cli.getFormatter('codeframe')
let report = cli.executeOnFiles(['./'])
console.log(formatter(report.results))
if (report.errorCount > 0) {
  console.error(`Hey! Don't push these changes! These changes are broken! Please fix the changes from the listing above.`)
  process.exit(1)
} else if (report.warningCount > 0) {
  console.warn(`Hey! Please don't push these changes. There are ESLint warnings in here. Please fix them using the listing above before pushing.`)
  process.exit(1)
}

if (report.errorCount == 0 && report.warningCount == 0) {
  console.log(`These changes are safe to commit and push.`)
  process.exit(0)
}