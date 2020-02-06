const fs = require('fs')
const webpack = require('webpack')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
  publicPath: '', // to ensure relative paths are used
  devServer: {
    proxy: {
      '^/api': { target: 'http://localhost:8080' }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"'
        }
      })
    ]
  }
}
