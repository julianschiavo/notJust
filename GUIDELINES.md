# Guidelines

## Getting Started
```
git clone https://github.com/justdotJS/notJust.git -b commands
npm i --only=dev
npm i --only=prod
```
1. Copy `config.example.json` to `config.json`
2. Make the proper changes to `config.json`
3. Make your changes, and follow the code style and contribution guidelines!
4. Test your changes (`npm test`)
5. If no errors or warnings occur during the testing, you can push the code!

## Updating your codebase on pushes
```
# run the below  only once!
# don't change @{u} anywhere...
git config --global alias.up '!git remote update -p; git merge --ff-only @{u}'

# after you can just do
git up

# if this fails about diverging or something like that run this to view the changes
git log --graph --oneline --decorate --date-order --color --boundary @{u}
# after you reviewed the changes and determined you can rebase...
git rebase -p @{u}
```
This will...
1. Let you use `git up` instead of `git pull`. Way better.

## Code Style and Contribution Guidelines
1. Use **SPACES** instead of tabs. Your space size should be set to 2.
2. Please beautify your code before pushing. In Visual Studio Code, this is easy, you just have to press `Ctrl` + `A`, then press, `Ctrl` + `K` + `F`.
3. Use single quotes (`'`) instead of double quotes (`"`)!
4. Do not use semicolons (`;`). They are not required and will throw errors with ESLint.
5. Don't make huge commits (commits with a ton of changes), make tinier commits with your changes described in the message, with text in brackets before the message stating what the change was in. Examples:
   * `[guidelines] Added semicolons warning` ✔️ - Descriptive and has brackets describing where the commit goes to
   * `[music] Added skip command` ✔️ - Descriptive and has brackets describing where the commit goes to
   * `[guidelines] changes` ❓ - Could have been worded better, and if it was a ton of changes I may let it slide...
   * `[guidelines & music] Added skip command` ❓ - Could have made use of staging files in changes to describe your changes better, and you shouldn't be doing this!
   * `wtf i don't even know what i made changes to` ❌ - Self explanatory
   * `Added skip command` ❌ - There aren't brackets describing what this commit relates to.
   * `Guidelines changes` ❌ - There aren't brackets describing what this commit relates to.
6. Don't push broken code. Please test your code before pushing. (`npm test` **AND** test your changes normally by manually invoking the changes that you made.)
7. Don't create bot events in `bot.js`, do them in the `events` folder.
8. You must use ESLint before pushing code. (`npm test`)
9. If you push code that ESLint does not like or you do not follow any of these guidelines, you will get yelled at by dotJS.
