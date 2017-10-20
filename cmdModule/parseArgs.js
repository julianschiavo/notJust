const Discord = require('discord.js')


String.prototype.replaceAll = function (target, replacement) {
  return this.split(target).join(replacement)
}

/**
 * @param {string} content - Content to parse into arguments
 */
module.exports = function (content) {
  if (typeof content !== 'string') throw new TypeError('Content must be a string.')
  let par = Discord.escapeMarkdown(content.substr(1))
  let parsed = par.match(/[^\s"]+|"([^"]*)"/gi)
  for (let _arg in parsed) {
    if (!parsed.hasOwnProperty(_arg)) continue
    let arg = parsed[_arg].replaceAll('"', '')
    parsed[_arg] = arg
  }
  return parsed
}