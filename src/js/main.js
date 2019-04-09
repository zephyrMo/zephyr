//config.js
requirejs.config({
    // baseUrl : './path'//基准路径--通常不设置
    paths : {
        //别名 : 模块路径
        'jQuery' : '../lib/jQuery/jquery-3.3.1',
        'bootstrap' : '../lib/bootstrap/js/bootstrap',
        'carousel' : 'zephyrCarousel',
        'swiper' : 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/js/swiper.min'
    },
    shim : {
        //配置依赖
        'swiper' : {
            deps: ['jQuery']
        },
        'carousel' : {
            deps : ['swiper']//依赖
        },
        'bootstrap' : {
            deps : ['jQuery']
        },
        'register' : {
            deps : ['jQuery']
        }
    }
})

//引入
require(['jQuery','bootstrap','carousel','swiper','register'])