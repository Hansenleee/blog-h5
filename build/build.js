var webpackConfig = require('./webpack/webpack.prod.conf')
var ora = require('ora')
var rimraf = require('rimraf')
var webpack = require('webpack')
var path = require('path')
var chalk = require('chalk')

// loading
var spinner = ora('buildinging ...')
spinner.start()

rimraf(path.join(process.cwd(), 'dist'), (err) => {
  if (err) {
    global.console.log('error', JSON.stringify(err))
    return
  }
  webpack(webpackConfig, function (error) {
    if (error) {
      global.console.log('error webpack', JSON.stringify(error))
      return
    }
    spinner.stop()

    global.console.log(chalk.cyan('  Build complete.\n'))
  })
})
