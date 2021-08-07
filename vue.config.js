module.exports = {               /* 自定义配置文件，会被vue自动加载*/
    configureWebpack: {
        resolve:{
            alias: {         /*为路径配置别名  @ 就相当于 src */
                'assets':'@/assets',
                'commons':'@/commons',
                'components':'@/components',
                'views':'@/views',
                'network':'@/network',
            }
        }
    }
}