module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:4000/api`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
