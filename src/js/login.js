function loadPage() {
    return new Promise(function (resolve) {
        //引入
        require(['main'],function(){
            require(['jQuery','bootstrap','getCode'],function($){
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
        var data = {
            authcode:false,
        }
        getCode()
        $('.login-btn').click(function(){
            if(data.authcode == true){
                $.ajax({
                    type: "post",
                    url: "../api/reg_log.php",
                    data: {
                        phone:$('#phone').val(),
                        psd:$('#password').val(),
                        port:'login'
                    },
                    success: function (response) {
                        var res = JSON.parse(response)
                        if(res.code == 0){
                            $('.login-btn').next().text('你输入的账号或者密码有误,请重新输入');
                            $('#password').val('');
                        }else if(res.code == 1){
                            window.location.href = '../index.html?uname='+$('#phone').val()
                        }
                    }
                });
            }
        })
        function getCode(){
            $('.code').css({width:100}).createCode({len: 4});
            $('#authcode').blur(function() {
                if ($(this).val().toLowerCase() !== $('.code').children('input').val().toLowerCase()) {
                    data.authcode = false;                        
                    $(this).css({
                        borderColor:'red'
                    })
                    $('.login-btn').click(function(e){
                        e.preventDefault();
                    })
                } else {
                    data.authcode = true;
                    $(this).css({
                        borderColor:'yellowgreen'
                    })
                }
            })
        }
    })
}
reg();