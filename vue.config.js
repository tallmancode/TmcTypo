/** @type import('@vue/cli-service').ProjectOptions */

module.exports = {
    // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
    chainWebpack(config) {
        config.devtool('source-map')
    },
    css: {
        sourceMap : true,
    }
}