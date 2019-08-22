/**
 * Created by lixinyu on 2019/8/21.
 */
$(document).ready(function () {
    //swiper轮播图
    var swiper = new Swiper('.swiper-container1', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });
    //导航条
    $("#menu").menu();
})

