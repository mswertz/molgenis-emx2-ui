module.exports = {
  publicPath: '', // to ensure relative paths are used
  devServer: {
    proxy: {
      '^/api': { target: 'http://localhost:8080' }
    }
  }
}
