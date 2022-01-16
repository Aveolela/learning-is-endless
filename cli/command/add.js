'use strict'

const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates.json')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  co(function* () {
    const tplName = yield prompt(chalk.green('Please input will add template name: '))
    const gitUrl = yield prompt(chalk.green('Please input git https link: '))
    const branch = yield prompt(chalk.green('Please input branch name: '))

    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['url'] = gitUrl
      config.tpl[tplName]['branch'] = branch
    } else {
      console.log(chalk.red('Template has already existed!'))
      process.exit()
    }

    fs.writeFile(path.resolve(__dirname, '../templates.json'), JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(chalk.green('Add new template success!'))
      console.log(chalk.grey('The last template list is:'))
      console.log(config)
      process.exit()
    })

  })
}