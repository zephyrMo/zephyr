if(location.search.length>1){
    var str = location.search.slice(1)
    var uname = str.split('&')[0].split('=')[1]
    if(uname!='undefined'){
        $('#login').find('a').text("欢迎,"+uname)
        $('#registet').parent().html('<span id="quit">退出登录</apn>')
        .on('click',function(){
            window.location.href = '../html/login.html'
        })
        $.post("../api/itemlist.php", {port:'cart',phone:uname},
            function (res) {
                var res = JSON.parse(res);
                var qty = res.allnum['SUM(Qty)']
                $('.itemNum').text(qty)
                $('.shop-cart').click(function(){
                    window.location.href = '../html/shopcart.html?uname='+str.split('&')[0].split('=')[1]
                })
            }
        );
    }
}