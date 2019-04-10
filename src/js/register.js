require(['main'],function(){
    require(['jQuery','bootstrap'],function($){
        ;jQuery(function($){
            $(document).ready(function(){
                console.log(666)
                $('.header').load('../html/shouye.html #header_nav',function(){
        
                }).prependTo('body')
            })
        })
    
    })
})