'use strict'

const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates.json')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  co(function* () {
    const tplName = yield prompt(chalk.green('Please input will delete template name: '))

    if (config.tpl[tplName]) {
      delete config.tpl[tplName]
    } else {
      console.log(chalk.red('Template does not exist!'))
      process.exit()
    }

    fs.writeFile(path.resolve(__dirname, '../templates.json'), JSON.stringify(config), 'utf-8', (err) => {
      if (err) console.log(err)
      console.log(chalk.green('Delete template success!'))
      console.log(chalk.grey('The last template list is:'))
      console.log(config)
      process.exit()
    })

  })
}