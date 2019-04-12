function loadPage() {
    return new Promise(function (resolve) {
        require(['main'],function(){
            require(['jQuery','bootstrap'],function($){
                jQuery(function($){
                    $(document).ready(function(){
                        $('header').load('../html/shouye.html #header_nav,#search',function(){
                
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
        if(location.search.length>1){
            var str = location.search.slice(1)
            // console.log(str.split('&')[0].split('='))
            $('#login').text("欢迎,"+str.split('&')[0].split('=')[1])
            $('.toindex')[0].href = '../index.html?uname='+str.split('&')[0].split('=')[1]
            $('#registet').parent().html('<span id="quit">退出登录</apn>')
            .on('click',function(){
                window.location.href = '../html/login.html'
            })
        }
        $.ajax({
            type: "post",
            url: "../api/itemlist.php",
            data: {
                guid:str.split('&')[1].split('=')[1],
                port:'findid'
            },
            success: function (response) {
                var res = JSON.parse(response)[0];
                function render(){
                    var $bookname = $('#www_goods_name');
                    var $title = $('#www_goods_upper_title').find('p')
                    var $author = $title.parent().next().find('a').first();
                    var $press = $title.parent().next().find('a').last()
                    var $price = $('#www_goods_market_price');
                    var $discount = $('#www_goods_price')
                    $bookname.text(res['书名'])
                    $title.text(res['类别'])
                    $author.text(res['作者'].replace(/\\/g,''))
                    $press.text(res['出版社'])
                    $price.text(res['原价'])
                    $discount.text(res['现价'])
                    $itemImg = $('div.square-box.bgimg')
                    var url = res['图片地址'].replace(/\\/g,'')
                    $itemImg.css({
                        backgroundImage:`url(${url})`
                    })
                }
                render()
                function cal(){
                    $add = $('.count-add');
                    $sub = $('.count-sub');
                    $addCart = $('.addcart')
                    $add.click(function(){
                        $('.number-box')[0].value++
                        $sub.css({color:'#212121'})
                    })
                    $sub.click(function(){
                        console.log($('.number-box')[0].value)
                        $('.number-box')[0].value--
                        if($('.number-box')[0].value<=0){
                            $('.number-box')[0].value=1;
                            $sub.css({color:'#ccc'})
                        }
                    })
                    $addCart.click(function(){
                        $.ajax({
                            type: "post",
                            url: "../api/itemlist.php",
                            data: {
                                port:'addCart',
                                guid:str.split('&')[1].split('=')[1],
                                goodnumber:$('.number-box')[0].value,
                                phone:str.split('&')[0].split('=')[1],
                            },
                            success: function (response) {
                                var res = JSON.parse(response)
                                console.log(res)
                            }
                        });
                    })
                }
                cal()
            }
        });
    })
}
reg();