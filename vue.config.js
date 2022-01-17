module.exports = {
  publicPath: '/',
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: `http:///0.0.0.0:4001/api`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
