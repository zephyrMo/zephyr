require(['main'],function(){
    require(['jQuery','bootstrap'],function($){
        jQuery(function($){
            $(document).ready(function(){
                $('header').load('../html/shouye.html #header_nav,#search',function(){
        
                }).prependTo('body');
                $('footer').load('../html/shouye.html footer',function(){

                }).appendTo('body')
            })
        })
    })
})