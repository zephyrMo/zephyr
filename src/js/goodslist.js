function loadPage() {
    return new Promise(function (resolve) {
        require(['main'], function () {
            require(['jQuery', 'bootstrap', 'topMenu'], function ($) {
                jQuery(function ($) {
                    $(document).ready(function () {
                        $('header').load('../index.html #header_nav,#search', function () {

                        }).prependTo('body');
                        $('footer').load('../index.html footer', function () {
                            require(['user'], function () {
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
        .then(function () {
            console.log($('#login'))
            if (uname == 'undefined') {
                $('#login').find('a')[0].href = '../html/login.html';
                $('#registet').find('a')[0].href = '../html/register.html'
            }
            var mainid = location.search.slice(1).split('&')[1].split('=')[1]
            console.log(str.split('&')[0].split('=')[1])
            $.ajax({
                type: "post",
                url: "../api/itemlist.php",
                data: {
                    port: 'mainid',
                    mainid: mainid
                },
                success: function (res) {
                    res = JSON.parse(res);
                    listRender(res)
                    function sort() {
                        var sortStatut = true;
                        //价格排序
                        $('.typesort').find('div[data-type="price"]').parent().click(function (){
                            sortStatut = !sortStatut
                            var port;
                            sortStatut?port='sortUp':port='sortDown';
                            $.ajax({
                                type: "post",
                                url: "../api/itemlist.php",
                                data: {
                                    port:port,
                                    page:$('.current').text(),
                                    qty:30,
                                    cid:res[0]['子类别id']

                                },
                                success: function (res2) {
                                    res2 = JSON.parse(res2).datalist
                                    console.log(res2)
                                    listRender(res2)
                                }
                            });
                        })
                        //销量排序
                        $('.typesort').find('div[data-type="sale"]').parent().click(function (){
                            sortStatut = !sortStatut
                            var port;
                            sortStatut?port='saleUp':port='saleDown';
                            $.ajax({
                                type: "post",
                                url: "../api/itemlist.php",
                                data: {
                                    port:port,
                                    page:$('.current').text(),
                                    qty:30,
                                    cid:res[0]['子类别id']

                                },
                                success: function (res3) {
                                    res3 = JSON.parse(res3).datalist
                                    listRender(res3)
                                }
                            });
                        })
                        $('.typesort').find('div[data-type="new"]').parent().click(function (){
                            sortStatut = !sortStatut
                            var port;
                            sortStatut?port='newUp':port='newDown';
                            $.ajax({
                                type: "post",
                                url: "../api/itemlist.php",
                                data: {
                                    port:port,
                                    page:$('.current').text(),
                                    qty:30,
                                    cid:res[0]['子类别id']

                                },
                                success: function (res4) {
                                    res4 = JSON.parse(res4).datalist
                                    listRender(res4)
                                }
                            });
                        })
                    }
                    sort()
                    //分页
                    function pagecut(){
                        var currentPage;//当前页码
                        var qty = 30;
                        $('.row.pagination').find('li').eq(1).find('a').click(function(e){
                            $('.row.pagination').find('li').eq(1).find('a').removeClass('current')
                            $(this).toggleClass('current')
                            e.preventDefault();
                            $.ajax({
                                type: "post",
                                url: "../api/itemlist.php",
                                data: {
                                    port:'pageCut',
                                    qty:30,
                                    currentPage:$(this).text(),
                                    cid:res[0]['子类别id']
                                },
                                success: function (res5) {
                                    console.log(JSON.parse(res5))
                                    var pageNum = Math.ceil(JSON.parse(res5).len/JSON.parse(res5).qty);
                                    res5 = JSON.parse(res5).resArr
                                    listRender(res5)
                                    // var $page = $('.row.pagination').find('li').eq(1)
                                    // for(var i=0;i<pageNum;i++){
                                    //     $page.html($('<a/>').text(i+1));
                                    // }
                                }
                            });
                        })
                    }
                    pagecut()
                    function listRender(res) {
                        var $imgbox = $('.square-box.one-one.bgimg')
                        var $title = $('.context').find('a')
                        var $discount = $('.context').find('span')
                        var $market = $('.context').find('del')
                        console.log(res[1])
                        $('.allcategory').find('a').eq(2).text(`${res[0]['类别']}`);
                        $('.allcategory').find('a').eq(2)[0].dataset.cid = res[0]['子类别id']
                        $('.allcategory').find('a').eq(2)[0].href = `goodslist.html?uname=${uname}&data-id=${res[0]['子类别id']}`
                        $imgbox.each(function (idx, item) {
                            item.style.backgroundImage = `url(${res[idx]['图片地址'].replace(/\\/g,'')})`
                        })
                        $title.each(function (idx, item) {
                            item.innerText = res[idx]['书名'].replace(/\\/g, '')
                            item.href = '../html/detail.html?uname=' + str.split('&')[0].split('=')[1] + '&data-id=' + res[idx]['guid']
                        })
                        $discount.each(function (idx, item) {
                            item.innerText = '￥' + res[idx]['现价']
                        })
                        $market.each(function (idx, item) {
                            item.innerText = '￥' + res[idx]['原价']
                        })
                    }
                }
            });
        })
}
reg();