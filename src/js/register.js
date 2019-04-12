
function loadPage() {
    return new Promise(function (resolve) {
        require(['main'],function(){
            require(['jQuery','bootstrap','getCode'],function($){
                ;jQuery(function($){
                    $(document).ready(function(){
                        $('.header').load('../html/shouye.html #header_nav',function(){
                            resolve()
                        }).prependTo('body')
                    })
                })
            })
        })
    })
}
async function reg() {
    await loadPage()
    .then(function(){
        jQuery(function ($) {
            //校验字段是否正确
            var data = {
                phone:false,
                authcode:false,
                psd:false,
                confirm_psd:false,
                agree:true
            }
            function validate(){
                $('#phone').blur(function(){
                    if(isPhone($('#phone').val(),$('#phone'))){
                        data.phone = true;
                        $(this).css({
                            borderColor:'yellowgreen'
                        })
                        $.ajax({
                            type: "post",
                            url: "../api/reg_log.php",
                            data: {
                                phone:$('#phone').val(),
                                port:'verifyUserName'
                            },
                            success: function (response) {
                                var res = JSON.parse(response)
                                let $info = $('#phone').parent().next().find('p')
                                if(res.code==0){
                                    $info.text(res.message).css({color:'yellowgreen'})
                                }else{
                                    $('#regBtn').click(function(e){
                                        e.preventDefault();
                                    })
                                    $('#phone').css({
                                        borderColor:'red'
                                    })
                                    $info.text(res.message).css({color:'red'})
                                }
                            }
                        });
                    }else{
                        data.phone = false;
                        $(this).css({
                            borderColor:'red'
                        })
                    }
                })
                $('.code').css({width:100}).createCode({len: 4});
                $('#authcode').blur(function() {
                    if ($(this).val().toLowerCase() !== $('.code').children('input').val().toLowerCase()) {
                        data.authcode = false;                        
                        $(this).css({
                            borderColor:'red'
                        })
                    } else {
                        data.authcode = true;
                        $(this).css({
                            borderColor:'yellowgreen'
                        })
                    }
                })
                $('#password').blur(function(){
                    if(isPsd($('#password').val(),$('#password'))){
                        data.psd = true;
                        $(this).css({
                            borderColor:'yellowgreen'
                        })
                    }else{
                        data.psd = false;
                        $(this).css({
                            borderColor:'red'
                        })
    
                    }
                })
                $('#confirm_password').blur(function(){
                    if($('#confirm_password').val()===$('#password').val()){
                        data.confirm_psd = true;
                        $(this).css({
                            borderColor:'yellowgreen'
                        })
                    }else{
                        data.confirm_psd = false;
                        $(this).css({
                            borderColor:'red'
                        })
    
                    }
                })
                $('#checkLabel').on('mousedown',function(e){
                    e.preventDefault() 
                    $('#checkLabel').find('#checkbox').toggleClass('icon-check icon-check-empty')
                    if($('#checkLabel').find('#checkbox').hasClass('icon-check')){
                        data.agree = true;
                        console.log(data)

                    }else{
                        data.agree = false;

                    }
                })
                    //联系电话(手机/电话皆可)验证
                function isPhone(value,element){
                    var mobile=/^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                    // var tel=/^\d{3,4}-?\d{7,9}$/;
                    return mobile.test(value);
                }
                function isPsd(val,ele){
                    var psd=/^\w{6,}$/g;
                    return psd.test(val);
                }
                return data;
            }
            validate();
            $('#regBtn').click(function(e){
                var arr = [];
                for(var key in data){
                    arr.push(data[key])
                }
                if(arr.indexOf(false)!=-1){
                     e.preventDefault() 
                }else{
                    $.ajax({
                        type: "post",
                        url: "../api/reg_log.php",
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        data: {
                            phone:$('#phone').val(),
                            psd:$('#password').val(),
                            port:'reg'
                        },
                        success: function (res) {
                            res = JSON.parse(res);
                            if(res.code==1){
                                $('.step-2').find('p').css({
                                    backgroundColor:'#2db4ea',
                                    color:'#fff'
                                })
                                $('.step-2').find('span').css({
                                    border:' 15px solid #2db4ea',
                                    borderLeft:'20px solid transparent'
                                })
                                $('.reg-bar-tips').next().animate({
                                    opacity:0
                                },1000)
                                setTimeout(function(){
                                    window.location.href = '../index.html?uname='+$('#phone').val()
                                },1000)
                            }
                        }
                    });
                }
            })
    })
})
}
reg();