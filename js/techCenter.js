$(document).ready(function () {
    /**
     * 加载公共头部和底部
     */
    $('#header').load('header.html');
    $('#footer').load('footer.html');
    /**
     * tab切换
     */
    $('.content_title li').click(function () {
        $(this).attr('class', 'select').siblings('.content_title li').removeAttr('class', 'select');
        $('.content>div').eq($(this).index()).attr('class', 'show').siblings('.content>div').removeAttr('class', 'show');
    });
    /**
     * 导航栏UI组件;
     */
    $("#menu").menu();
})