const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })

    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./CNAME",
            to: './'
          }
        ]
      })
    ]
  }
}