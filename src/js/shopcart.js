function loadPage() {
    return new Promise(function (resolve) {
        require(['main'],function(){
            require(['jQuery','bootstrap'],function($){
                jQuery(function($){
                    $(document).ready(function(){
                        $('.bookuulogo').load('../html/register.html header>div:last',function(){
                
                        }).prependTo('body');
                        $('header').load('../index.html #header_nav',function(){
                
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
        if(uname=='undefined'){
            $('.section').toggleClass('dn')
            $('.db.logo-box.fl')[0].href = '../index.html?uname='+str.split('&')[0].split('=')[1];
        }else{
            $('.db.logo-box.fl')[0].href = '../index.html?uname='+str.split('&')[0].split('=')[1];
            $.post("../api/itemlist.php", {port:'cart',phone:str.split('&')[0].split('=')[1]},
                function (data, textStatus, jqXHR) {
                    var res = JSON.parse(data)
                    console.log(res.data)
                    for(var i=0;i<res.data.length;i++){
                        $('.choose-box')[0].innerHTML += 
                        `<tr class="goods-box" id="${res.data[i].id}">
                            <td colspan="8">
                                <div class="typecart-2">
                                    <ul class="bb-1-e8 delete-box wd-1200 pd-0500">
                                        <li class="pr ta-ct wd-80 ht-80 fl fs-15">
                                            <input type="checkbox" data-id="${res.data[i].id}" style="cursor:pointer" class="choose choose-child product pafull-box zi-1 op-0" checked="checked" value="1">
                                            <span class="fa fa-check-square-o cl-rd-l fs-18"></span>
                                        </li>
                                        <li class="wd-450 ht-100 fl">
                                            <div class="fl wd-100 pr">
                                                <a class="db square-box one-one bgimg lazyload visible" href="../html/detail.html?uname=${uname}&data-id=${res.data[i].id}" style="background-image: url(${res.data[i].imgurl}")></a>
                                            </div>
                                            <div class="fr wd-300 ">
                                                <p class="ht-60 lh-20 oh mt-8 fs-14">${res.data[i].title}</p>
                                                <p class="ht-25 lh-25 oh mt-10"></p>
                                            </div>
                                            <div class="cb"></div>
                                        </li>
                                        <li class="ta-ct wd-160 fl lh-30">
                                            <del class="cl-9 mt-10">￥68</del>
                                            <p class="fs-16">¥<span class="money">${res.data[0].price}</span></p>
                                            <!-- <label class="cl-bl-l bd-1-bl-d bc-bl-l pd-0208 br-2">卖家促销<span class="icon-down-line ml-5 fs-13">&#xe91e;</span></label> -->
                                        </li>
                                        <li class="ta-ct wd-120 fl">
                                            <div class="count-box mt-35">
                                                <div class="count-sub fl cl-c" data-price="${res.data[i].price}" data-id="${res.data[i].id}">-</div>
                                                <input class="text fl number-box" type="tel" data-id="${res.data[i].id}" value="${res.data[i].Qty}">
                                                <div class="count-add fr" data-price="res.data[0].market" data-id="${res.data[i].id}">+</div>
                                                <div class="cb"></div>
                                            </div>
                                        </li>
                                        <li>
                                        </li>
                                        <li class="fs-16  cl-rd ta-ct wd-200 fl mt-35">¥<span>${res.data[i].price}</span></li>
                                        <li class="fs-16 wd-120 fl">
                                            <p style="cursor:pointer" class=" mt-35" data-id="${res.data[i].id}">移入收藏夹</p>
                                            <span class="cl-bl-l cp delbtn" data-id="${res.data[i].id}">删除</span>
                                        </li>
                                        <div class="cb"></div>
                                    </ul>
                                </div>
                            </td>
                        </tr>`
                    }
                    //加减输入框
                    function cal(){
                        $add = $('.count-add');
                        $sub = $('.count-sub');
                        $addCart = $('.addcart')
                        $add.click(function(){
                            // console.log($(this).prev());
                            $(this).prev()[0].value++
                            $sub.css({color:'#212121'})
                            $.ajax({
                                type: "post",
                                url: "../api/itemlist.php",
                                data:{
                                    port:'addCart',
                                    guid:$(this)[0].dataset.id,
                                    goodnumber:1,
                                    phone:str.split('&')[0].split('=')[1],  
                                },
                                success: function (res) {
                                    var res = JSON.parse(res);
                                    console.log(res)
                                    $('.money-box')[0].innerText = res.allprice['SUM(price * Qty)']
                                    $('.money-box.withpostage')[0].innerText = Number(res.allprice['SUM(price * Qty)'])+Number($('.postage').text())
                                }
                            });
                        })
                        $sub.click(function(){
                            console.log($('.number-box')[0].value)
                            var subval;
                            $(this).next()[0].value--
                            if($(this).next()[0].value<=0){
                                $(this).next()[0].value=1;
                                subval = 0
                                $sub.css({color:'#ccc'})
                            }else{
                                subval = -1
                            }
                            $.ajax({
                                type: "post",
                                url: "../api/itemlist.php",
                                data:{
                                    port:'addCart',
                                    guid:$(this)[0].dataset.id,
                                    goodnumber:subval,
                                    phone:str.split('&')[0].split('=')[1],  
                                },
                                success: function (res) {
                                    var res = JSON.parse(res);
                                    $('.money-box')[0].innerText = res.allprice['SUM(price * Qty)']
                                    $('.money-box.withpostage')[0].innerText = Number(res.allprice['SUM(price * Qty)'])+Number($('.postage').text())
                                }
                            });
                        })
                        $('.number-box').blur(function(){
                            $.ajax({
                                type: "post",
                                url: "../api/itemlist.php",
                                data:{
                                    port:'addCart',
                                    guid:$(this)[0].dataset.id,
                                    goodnumber:$(this)[0].value,
                                    numberbox:'numberbox',
                                    phone:str.split('&')[0].split('=')[1],  
                                },
                                success: function (res) {
                                    var res = JSON.parse(res);
                                    console.log(res)
                                    $('.money-box')[0].innerText = res.allprice['SUM(price * Qty)']
                                    $('.money-box.withpostage')[0].innerText = Number(res.allprice['SUM(price * Qty)'])+Number($('.postage').text())
                                    
                                }
                            });
                        })
                    }
                    cal()
                    total();
                    //删除
                    function del(){
                        $del = $('.delbtn');
                        $del.click(function(){
                            if(confirm('客官不手下留情吗?')){
                                $.ajax({
                                    type: "post",
                                    url: "../api/itemlist.php",
                                    data: {
                                        phone:str.split('&')[0].split('=')[1],
                                        port:'cartDel',
                                        guid:$(this)[0].dataset.id,
                                    },
                                    success: (res) =>{
                                        if(!res){
                                            $('.money-box')[0].innerText = 0
                                             $('.money-box.withpostage')[0].innerText = 0;
                                        }
                                        $(this).parents('.goods-box').remove()
                                    }
                                });
                            }
                        })
                    }
                    del()
                    function total(){
                        console.log(res.allprice['SUM(price * Qty)'])
                        $('.money-box')[0].innerText = res.allprice['SUM(price * Qty)']
                        $('.money-box.withpostage')[0].innerText = Number(res.allprice['SUM(price * Qty)'])+Number($('.postage').text())
                    }
                }
            );
        }
    })
}
reg();