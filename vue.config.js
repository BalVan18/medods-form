const { defineConfig } = require('@vue/cli-service')
Vue.config.devtools = true
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/medods-form/'
    : '/'
})