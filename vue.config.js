module.exports = {
    devServer: {
        proxy: {
            '/api':{
                // localhost
                target: 'http://47.102.214.242:8079/admin/',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^api': ''
                }
            }
        }
    },
    publicPath: './',
    outputDir: 'dist'
}