module.exports = {
  publicPath: './',
  devServer: {
    port: 8082,
    proxy: {
      '/api': {
        target: `http://0.0.0.0:4002/api`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
