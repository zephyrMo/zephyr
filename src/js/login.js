function loadPage() {
    return new Promise(function (resolve) {
        //引入
        require(['main'],function(){
            require(['jQuery','bootstrap'],function($){
                jQuery(function($){
                    $(document).ready(function(){
                        $('header').load('../html/register.html header>div:last',function(){
                
                        }).prependTo('body');
                        $('footer').load('../html/shouye.html footer',function(){
                            resolve()
                        }).appendTo('body')
                    })
                })
            })
        })
    })
}
async function reg() {
    await loadPage()
    .then(function(){

    })
}
reg();