module.exports = {
    devServer: {
        proxy: {
            '/api':{
                target: 'http://localhost:8079',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^api': ''
                }
            }
        }
    },
    publicPath: '/admin',
}