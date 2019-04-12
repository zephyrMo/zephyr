//config.js
requirejs.config({
    // baseUrl : './path'//基准路径--通常不设置
    paths : {
        //别名 : 模块路径
        'jQuery' : '../lib/jQuery/jquery-3.3.1',
        'bootstrap' : '../lib/bootstrap/js/bootstrap',
        'carousel' : 'zephyrCarousel',
        'swiper' : '../lib/swiper/swiper.min',
        'register' : 'register',
        'login' : 'login',
        'countdown' : '/lib/jcountdown/jquery.jcountdown.min',
        'topMeunu' : 'topMenu'
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
        },
        'login' : {
            deps : ['jQuery']
        },
        'countdown' : {
            deps : ['jQuery']
        },
        'topMenu' : {
            deps : ['jQuery']
        }
    }
})

//引入
// require(['jQuery','bootstrap','carousel','swiper'])