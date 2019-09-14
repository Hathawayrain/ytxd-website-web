var sub = 0
// title tab
$('.title ul li').click(function () {
    $(this).addClass('lihover').siblings().removeClass('lihover')
    .parent().parent().next().children().eq($(this).attr('value')).addClass('divblock')
    .siblings().removeClass('divblock')
    $('.Subscript').children().eq(1).text($(this).text())
})
// 新闻中心左侧tab
$('.contentLeft ul li').click(function () {
    $(this).addClass('leftLiClick').siblings().removeClass('leftLiClick')
    .parent().parent().prev().children().eq(2).text($(this).text())
})
// 员工关怀hover
$('.careTop .left li').hover(function () {
    $(this).addClass('careToplihover').siblings().removeClass('careToplihover')
    .children('i').addClass('careTopIhover')
})
$('.careBootom .left li').hover(function () {
    $(this).addClass('careToplihover').siblings().removeClass('careToplihover')
    .children('i').addClass('careTopIhover')
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