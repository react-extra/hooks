module.exports = {
  '*.js': ['eslint --no-ignore --fix --max-warnings=0', 'git add --force'],
  '*.{json, md}': ['prettier --write', 'git add --force'],
}
