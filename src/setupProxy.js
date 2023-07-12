const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', { //api是需要转发的请求(所有带有/api前缀的请求都会转发给3000)
      target: 'http://api.yytianqi.com', //请求转发给谁 配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true,  //控制服务器收到请求头中host字段的值：标识请求从哪里发出来的
      /*
       changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:3000
       changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
       changeOrigin默认值为false，但我们一般将changeOrigin值设为true
    */
      pathRewrite: { '^/api': '' } //重写请求路径，不加会报错  控制服务器接收到的请求头中host字段的值 去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
    }),
    createProxyMiddleware('/duanzi', {
      target: 'http://api.lkblog.net',
      changeOrigin: true,
      pathRewrite: { '^/duanzi': '' }
    }),
    createProxyMiddleware('/wen', {
      target: 'http://localhost:8001',
      changeOrigin: true,
      pathRewrite: { '^/wen': '' }
    })
  )
}
