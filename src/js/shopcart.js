require(['main'],function(){
    require(['jQuery','bootstrap'],function($){
        jQuery(function($){
            $(document).ready(function(){
                $('.bookuulogo').load('../html/register.html header>div:last',function(){
        
                }).prependTo('body');
                $('header').load('../html/shouye.html #header_nav',function(){
        
                }).prependTo('body');
                $('footer').load('../html/shouye.html footer',function(){

                }).appendTo('body')
            })
        })
    })
})