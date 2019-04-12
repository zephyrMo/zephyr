require(['main'], function () {
    require(['jQuery', 'bootstrap', 'carousel', 'swiper', 'countdown', 'topMenu'], function (a, b, c, Swiper) {
        $(function(){
            console.log(location.search.split('=')[1])
            if(location.search.length>1){
                $('#login').text("欢迎,"+location.search.split('=')[1])
                $('#registet').parent().html('<span id="quit">退出登录</apn>')
                .on('click',function(){
                    window.location.href = '../html/login.html'
                })
            }
        })
        $(function () {
            var b = new Date;
            var b = -b.getTimezoneOffset() / 60;
            var i = '2019/04/12 21:00:00';
            var config = {
                timeText: i, //倒计时时间
                timeZone: b, //时区
                style: "flip", //显示的样式，可选值有flip,slide,metal,crystal
                color: "black", //显示的颜色，可选值white,black
                width: 180, //倒计时宽度
                textGroupSpace: 15, //天、时、分、秒之间间距
                textSpace: 0, //数字之间间距
                reflection: 0, //是否显示倒影
                reflectionOpacity: 10, //倒影透明度
                reflectionBlur: 0, //倒影模糊程度
                dayTextNumber: 0, //倒计时天数数字个数
                displayDay: 0, //是否显示天数
                displayHour: !0, //是否显示小时数
                displayMinute: !0, //是否显示分钟数
                displaySecond: !0, //是否显示秒数
                displayLabel: 0, //是否显示倒计时底部label
                onFinish: function () {}
            };
            $(".countdown").jCountdown(config);
            //设置小轮播图
            var mySwiperTime = new Swiper('.swiper-container1', {
                autoplay: false, //可选选项，自动滑动
                speed: 1000,
                slidesPerView: 6,
                slidesPerGroup: 6,
                navigation: {
                    clickable: true,
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
            // 设置大轮播图背景
            $bigBanner = $('.swiper-container');
            $bigBanner.find('.swiper-slide').text('').css({
                background: 'url(img/ad-banner1.jpg) center center',
                backgroundSize: 'cover'
            })
            // //设置吸顶
            // window.onscroll = function(){
            //     console.log($('.section').offset().top)
            //     window.scrollY>$('.section').offset().top?$('#search .logo').addClass('active'):$('#search .logo').removeClass('active')
            // }
        })
        var hot = 400;
        function aJaxTitle() {
            return new Promise(function (resolve) {
                $.ajax({
                    type: 'post', //默认get请求,可以不写
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    url: '../api/itemlist.php',
                    data: {
                        类别: 'all',
                        出版社:'all',
                        作者:'all'
                    },
                    success: function (responseTxt) {
                        var data = JSON.parse(responseTxt);
                        resolve(data)
                    }
                })
            })
        }
        
        async function renderTitle() {
            await aJaxTitle()
            .then(function(data){
                //导航渲染
                let $menu = $('.menu .title');
                let $ul = $menu.find('ul');
                let $title = $('.menu .title')
                //导航渲染
                navRender()
                //导航hover
                $menu.hover(function(){
                    $(this).find('.iconfont').eq(0).css({
                        backgroundPositionX: '-50px'
                    })
                    $ul.offset({top:195,left:284})
                },function(){
                    $(this).find('.iconfont').eq(0).css({
                        backgroundPositionX: '0px'
                    })
                })
                function navRender(){
                    let arr1 = data[0].map(function(item,idx){
                        return item['类别']
                    })
                    let items1 = new Set(arr1);
                    //去重后将set集合重新转成数组
                    arr1 = Array.from(items1);
                    $title.children('a').each(function(idx,item){
                            item.innerText = arr1[idx]
                    })
                    
                    let res = []
                    res.push(data[1].map(function(item,idx){
                        return item['出版社']
                    }))
                    let items2 = new Set(res);
                    //去重后将set集合重新转成数组
                    res = Array.from(items2);
                    res.push(data[2].map(function(item,idx){
                        return item['作者']
                    }))
                    let items3 = new Set(res);
                    //去重后将set集合重新转成数组
                    res = Array.from(items3);
                    var str = '<div class="bb-1-e pb-5">';
                    var html1 = res[0].map(function(ele,index){
                            str +=  `<a target="_blank" href="#" class="bc-bl cl-f pd-0005 bd-1-bl-d mr-10 fl mb-5">${res[0][index]}</a>`
                            if(index == ele.length-1){
                                str+= `<div class="cb"></div></div>`
                                return str;
                            }
                        }).join('')
                    $ul.html(html1);
                    var str2 = `<div class="minh-215 mb-5">`;
                    var str3 = `<li><div class="wd-110 fl ">
                                    <a target="_blank" href="#" class="fl mr-15 fw-bd">${res[1][0]}</a>
                                    <div class="cb"></div>
                                </div>
                                <div class="wd-650 cl-6 fl" style="width: 650px;">`
                    var html2 = res[1].map(function(item,idx){
                        item = item.replace(/\\/g,'');
                        substr =  `<a target="_blank" href="#" class="fl mr-15">${item}</a>`
                        str3 += substr
                        // console.log(idx)
                        if(idx == res[1].length-1){
                            str3+= `<div class="cb"></div></div><div class="cb"></div></li>`
                            for(var i=0;i<6;i++){
                                str2+=str3
                            }
                            str2+=`</div>`
                            return str2;
                        }
                    }).join('')
                    // console.log(html2)
                    $ul.each(function(idx,item){
                        item.innerHTML += html2;
                    })
                }

                
                return data;
            })
        }
        renderTitle()
        function aJax() {
            return new Promise(function (resolve) {
                $.ajax({
                    type: 'get', //默认get请求,可以不写
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    url: '../api/itemlist.php',
                    data: {
                        热度: hot
                    },
                    success: function (responseTxt) {
                        var data = JSON.parse(responseTxt);
                        resolve(data)
                    }
                })
            })
        }
        async function render() {
            await aJax()
            .then(function(data){
                $limitime = $('.swiper-container1 .swiper-wrapper')
                .find('.swiper-slide').text('');
                data.forEach((item,idx)=>{
                    $limitime[idx].style.backgroundImage =  
                    `url(${item['图片地址'].replace(/\\/g,'')})`
                })
                return data;
            })
            .then(function(data){
                //博库热推
                var $boxHot = $('#anchor-box2 .tab-content ul')
                function rdBox (listNum,limitNum){
                    $boxHot[0].innerHTML = data.map(function(item,idx){
                        if(idx < listNum){
                        var id = item['guid']
                        var title = item['书名'];
                        var price = item['原价'];
                        var discount = item['现价'];
                        return `<li data-id=${id}>
                                    <div class="imgBox">
                                        <div class="scale">
                                            <a href="#" class="pic"></a>
                                        </div>
                                        <div class="contxt">
                                            <a href="#">${title}</a>
                                            <p>
                                                <span class="fs-16 cl-rd-l ">¥${discount}</span>
                                                <span class="cl-9">|</span>
                                                <del class="fs-12 cl-9">¥${price}</del>
                                            </p>
                                        </div>
                                    </div>
                                </li>`
                        }
                    }).join('')
                    $boxHot[1].innerHTML = data.map(function(item,idx){
                        if(idx >= listNum && idx< limitNum){
                        var id = item['guid']
                        var title = item['书名'];
                        var price = item['原价'];
                        var discount = item['现价'];
                        return `<li data-id=${id}>
                                    <div class="imgBox">
                                        <div class="scale">
                                            <a href="#" class="pic"></a>
                                        </div>
                                        <div class="contxt">
                                            <a href="#">${title}</a>
                                            <p>
                                                <span class="fs-16 cl-rd-l ">¥${discount}</span>
                                                <span class="cl-9">|</span>
                                                <del class="fs-12 cl-9">¥${price}</del>
                                            </p>
                                        </div>
                                    </div>
                                </li>`
                        }
                    }).join('')
                    $(data).each(function(idx,item){
                        var url = item['图片地址'].replace(/\\/g,'');
                        if(idx<listNum){
                            $boxHot.find('.pic')[idx].style.backgroundImage = `url(${url})`
                        }
                    })
                    $(data).each(function(idx,item){
                        var url = item['图片地址'].replace(/\\/g,'');
                        if(idx >= listNum && idx< limitNum){
                            $boxHot.find('.pic')[idx].style.backgroundImage = `url(${url})`
                        }
                    })
                }
                rdBox(5,10);
                //图书频道
                $boxHot = $('#anchor-box3 .tab-content ul')
                rdBox(6,12);
                //图书频道
                $boxHot = $('#anchor-box4 .tab-content ul')
                rdBox(5,10)
                //分类推荐
                $boxHot = $('#anchor-box5 .tab-content ul')
                rdBox(5,10)
                //文创频道
                $boxHot = $('#anchor-box7 .tab-content ul')
                rdBox(5,10)
                //影音频道
                $boxHot = $('#anchor-box9 .tab-content ul')
                rdBox(6,12)
                return data;
            })
            .then(function(data){
                $topBtn = $('.action-totop');
                $topBtn.click(function(){
                    $topBtn.timer = setInterval(function(){
                          scrollBy(0,Math.floor((0-$(document).scrollTop())/100))
                          if(window.scrollY <= 0){
                              clearInterval($topBtn.timer)
                          }
                      },1)
                }).hide()
                $(document).scroll(function(){
                    if($(document).scrollTop()>500){
                        $topBtn.show(300)
                    }else{
                        $topBtn.hide(300)
                    }
                })
            })
        }
        render();
    });
});
