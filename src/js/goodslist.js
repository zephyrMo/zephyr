function loadPage() {
    return new Promise(function (resolve) {
        require(['main'],function(){
            require(['jQuery','bootstrap','topMenu'],function($){
                jQuery(function($){
                    $(document).ready(function(){
                        $('header').load('../index.html #header_nav,#search',function(){
                
                        }).prependTo('body');
                        $('footer').load('../index.html footer',function(){
                            require(['user'],function(){
                                resolve()
                            })
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
        console.log($('#login'))
        if(uname=='undefined'){
        $('#login').find('a')[0].href = '../html/login.html';
        $('#registet').find('a')[0].href = '../html/register.html'
        }
        var mainid = location.search.slice(1).split('&')[1].split('=')[1]
        console.log(str.split('&')[0].split('=')[1])
        $.ajax({
            type: "post",
            url: "../api/itemlist.php",
            data: {
                port:'mainid',
                mainid:mainid
            },
            success: function (res) {
                res = JSON.parse(res);
                function listRender(){
                    var $imgbox = $('.square-box.one-one.bgimg')
                    var $title = $('.context').find('a')
                    var $discount = $('.context').find('span')
                    var $market =  $('.context').find('del')
                    $('.allcategory').find('a').eq(2).text(`${res[0]['类别']}`);
                    $('.allcategory').find('a').eq(2)[0].dataset.cid = res[0]['子类别id']
                    $('.allcategory').find('a').eq(2)[0].href = `goodslist.html?uname=${uname}&data-id=${res[0]['子类别id']}`
                    $imgbox.each(function(idx,item){
                        item.style.backgroundImage = `url(${res[idx]['图片地址'].replace(/\\/g,'')})`
                    })
                    $title.each(function(idx,item){
                        item.innerText = res[idx]['书名'].replace(/\\/g,'')
                        item.href = '../html/detail.html?uname='+str.split('&')[0].split('=')[1]+'&data-id='+res[idx]['guid']
                    })
                    $discount.each(function(idx,item){
                        item.innerText = '￥'+res[idx]['现价']
                    })
                    $market.each(function(idx,item){
                        item.innerText = '￥'+res[idx]['原价']
                    })
                }
                listRender()
                function sort(){
                    console.log($('.typesort').find('div[data-type="price"]'))
                }
                sort()
            }
        });
    })
}
reg();