//设置吸顶
window.onscroll = function(){
    window.scrollY>$('.section').offset().top?$('#search .logo').addClass('active'):$('#search .logo').removeClass('active')
}