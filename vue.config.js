module.exports = {
  publicPath: '/',
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: `http://localhost:4001/api`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
