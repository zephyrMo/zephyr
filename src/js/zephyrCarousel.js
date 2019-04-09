;jQuery(function($){
    $(document).ready(function(){
        require(['swiper'],function(Swiper){
            var mySwiper = new Swiper ('.swiper-container', {
                autoplay:true,
                speed:1500,
                effect:'slide',
                direction:'horizontal', // 垂直切换选项
                loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                el: '.swiper-pagination',
                type:'custom',
                renderCustom: function (swiper, current, total) {
                    $('.swiper-pagination-custom').html('');
                    for (var i = 0; i < total; i++) {
                        var $customs = $('<span/>');
                        $customs.addClass('swiper-pagination-customs').appendTo('.swiper-pagination-custom')
                        if (i == (current - 1)) {
                            $customs.toggleClass('swiper-pagination-customs-active')
                        }
                        $customs.text(i + 1).css({
                            'textIndent': '-10000px'
                        })
                    };
                    return $('.swiper-pagination-custom').html();
                    // console.log($('.swiper-pagination-custom span').text())
                }
                },
                // 如果需要前进后退按钮
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                }
            })
            mySwiper.on('click',function(e){
                if($(e.target).hasClass('swiper-pagination-customs')){
                    var index = e.target.innerText;
                    mySwiper.slideTo(index,1000,false)
                }
            })
        })
    })
})