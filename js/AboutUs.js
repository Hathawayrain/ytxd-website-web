$(document).ready(function () {
    /**
     * 加载公共头部和底部
     */
    $('#header').load('header.html');
    $('#footer').load('footer.html');
})
var sub = 0
// title tab
$('.title ul li').click(function () {
    $(this).addClass('lihover').siblings().removeClass('lihover')
    .parent().parent().next().children().eq($(this).attr('value')).addClass('divblock')
    .siblings().removeClass('divblock')
    $('.Subscript').children().eq(1).text($(this).text())
    if ($('.lihover').html() == '新闻中心') {
        newsJudge($('.leftLiClick').html())
    } else if ($('.lihover').html() == '员工关怀') {
        Employess()
    } else if ($('.lihover').html() == '荣誉资质') {
        certificate()
        certifi()
    }
})
// 人才发展
$('.developmentTop li').hover(function() {
    $(this).addClass('deveOn').siblings().removeClass('deveOn')
    $(this).children('img').addClass('deveTopnoe').parent().siblings().children('img').removeClass('deveTopnoe')
    $(this).children('span').addClass('developon').parent().siblings().children('span').removeClass('developon')
    $(this).children('p').addClass('devePon').parent().siblings().children('p').removeClass('devePon')
})
//加入我们
$('.Joinus .right .on').click(function() {
    if ($(this).siblings('.rightsmall').children('ul').css('left') != '0px') {
        sub = 0
        $(this).siblings('.rightsmall').children('ul').css('left', sub+'px')
    }
})
$('.Joinus .right .next').click(function() {
    if ($(this).siblings('.rightsmall').children('ul').css('left') == '0px') {
        sub = 210
        $(this).siblings('.rightsmall').children('ul').css('left', '-'+sub+'px')
    }
})
// 荣誉资质
$('.honorTab li').click(function() {
    $(this).addClass('Tablion').siblings().removeClass('Tablion')
    let classes = '.'+$(this).attr('value')
    $(classes).addClass('honorbl').siblings().removeClass('honorbl')
})