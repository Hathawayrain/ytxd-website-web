var WEBYTXD = 'http://192.168.43.55:6002'
var num = 1
var newnum = 1
var newrows = 5
var categoryId = 80
// 转换时间戳
function timestampToTime(timestamp) {
    var date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '/';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    D = date.getDate();
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D;
}
// 新闻中心接口
function news(categoryId,newrows,num) {
    $.ajax({
        url:WEBYTXD+"/web/queryArticle?categoryId="+categoryId+"&rows="+newrows+"&page="+num,
        Type:'get',
        datatype:'json',
        success:function(res){
            $('.newsRight>ul').html('')
            res.resultList.forEach(res => {
                $('.newsRight>ul').append('<a href="productDetails.html?id='+res.articleId+'" target="_blank"><li class="clearfix">'+res.articleTitle+'<span>'+timestampToTime(res.createTime)+'<i>>></i></span> </li></a>')
            });
            newnum = res.totelPage
            $('.newsRight>.paging ul li').eq(6).html('当前'+num+'/'+res.totelPage+'页,共'+res.totalSize+'条记录')
        }
    })
    $('.newsRight #newJump').val(num)
}
// 判断新闻中心tab接口
function newsJudge(html) {
    if (html == '公司新闻') {//公司新闻数据
        categoryId = 80
        news(categoryId,newrows,num)
    } else if (html == '行业新闻') {//行业新闻
        categoryId = 90
        news(categoryId,newrows,num)
    } else if (html == '公司重要事项') {//公司重要事项
        categoryId = 100
        news(categoryId,newrows,num)
    }
}
// 新闻中心左侧tab
$('.contentLeft ul li').click(function () {
    $(this).addClass('leftLiClick').siblings().removeClass('leftLiClick')
    .parent().parent().prev().children().eq(2).text($(this).text())
    num = 1
    newsJudge($('.leftLiClick').html())
    return false
})

//新闻中心分页
$('.newsRight .nextPage').click(function () { // 下一页
    num++
    if (num >= newnum) {
        num = newnum
    }
    newsJudge($('.leftLiClick').html())
})
$('.newsRight .onPage').click(function () { // 上一页
    num--
    if (num <= 1) {
        num = 1
    }
    newsJudge($('.leftLiClick').html())
})
$('.newsRight .firstPage').click(function () { // 首页
    num = 1
    newsJudge($('.leftLiClick').html())
})
$('.newsRight .lastPage').click(function () { // 尾页
    num = newnum
    newsJudge($('.leftLiClick').html())
})
$('.newsRight #newJump').blur(function () { // 跳转到
    let pattern = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
    let isNum = new RegExp(pattern);
    num = $('.newsRight #newJump').val()
    if (!isNum.test(num)) {
        num = 1
    }
    if (num >= newnum) {
        num = newnum
    }
    newsJudge($('.leftLiClick').html())
})


