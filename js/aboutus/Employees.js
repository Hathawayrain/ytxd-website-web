
// 员工关怀hover
$(document).on("mouseover",".careTop .left li",function(){
    let ids = $(this).parent().parent().attr('id')
    $(`#${ids} .left li`).eq($(this).index()).addClass('careToplihover').siblings().removeClass('careToplihover')
    $(`#${ids} .left li a`).eq($(this).index()).children('i').addClass('careTopIhover')
    $(`#${ids} .left li`).eq($(this).index()).siblings().children('a').children('i').removeClass('careTopIhover')
    $(`#${ids} .left li`).parents(`.Employeescare #${ids}`).children('.right').children('img')
    .eq($(`#${ids} .careToplihover`).eq($(`#${ids} .left li`).index()).index()).addClass('caraImg').siblings().removeClass('caraImg')
})
function imgCycle(imgurl) {
    if (imgurl) {
        let url = ''
        imgurl.forEach(element => {
            if(element.categoryId == 240){
                url = element.url
            }
        });
        return url
    }else {
        return ''
    }
}
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
// 员工关怀接口
function Employess() {
    $.ajax({
        url:WEBYTXD+"/web/queryArticle?categoryId=210&rows=999&page=1",
        Type:'get',
        datatype:'json',
        success:function(res){
            let i = 'careTop_1'
            $('.Employeescare').html('')
            for (a=0;a<=res.resultList.length;a++) {
                if (a%3 == 0) {
                    i = 'careTop_'+a
                    $('.Employeescare').append(
                        `<div class="careTop clearfix" id='${i}'>
                            <ul class="left">
                                <li class="clearfix careToplihover"><a href="./productDetails.html?id=${res.resultList[a].articleId}" target="_blank"><div class="divlist clearfix"><h1>0${a+1}</h1><div><h6>${res.resultList[a].articleTitle}</h6><p>${res.resultList[a].sketch}</p></div></div><span class="date">${timestampToTime(res.resultList[a].createTime)}</span><i class="careTopIhover"></i></a></li>
                            </ul>
                            <div class="right">
                                <img class="caraImg" src="${imgCycle(res.resultList[a].files)}" alt="">
                            </div>
                        </div>`
                    )
                } else {
                    $('#'+i+'>ul').append('<li class="clearfix"><a href="./productDetails.html?'+res.resultList[a].articleId+'" target="_blank"><div class="divlist clearfix"><h1>0'+(a+1)+'</h1><div><h6>'+res.resultList[a].articleTitle+'</h6><p>'+res.resultList[a].sketch+'</p></div></div><span class="date">'+timestampToTime(res.resultList[a].createTime)+'</span><i></i></a></li>')
                    $('#'+i+' .right').append(`<img src="${imgCycle(res.resultList[a].files)}" alt="">`) 
                }
            }
        }
    })
    $('.newsRight #newJump').val(num)
}
// 荣誉资质接口
function certificate() {
    $.ajax({
        url:WEBYTXD+"/file/selectCategoryId?categoryId=30&rows=999&page=1",
        Type:'get',
        datatype:'json',
        success:function(res){
            let i = 'careTop_1'
            $('.HonoraryCertificate').html('')
            for (a=0;a<=res.resultList.length;a++) {
                if (a%3 == 0) {
                    i = 'employ_'+a
                    $('.HonoraryCertificate').append(
                        `<ul class="clearfix" id="${i}">
                            <li>
                                <img src="${res.resultList[a].url}" alt="">
                            </li>
                        </ul>`
                    )
                } else {
                    $('#'+i).append(`<li><img src="${res.resultList[a].url}" alt=""></li>`)
                }
            }
        }
    })
    $('.newsRight #newJump').val(num)
}
// 知识产权接口
function certifi() {
    $.ajax({
        url:WEBYTXD+"/file/selectCategoryId?categoryId=40&rows=999&page=1",
        Type:'get',
        datatype:'json',
        success:function(res){
            res.resultList.forEach(element => {
                $('.HonoraryCer').append(`<div class="honor clearfix">
                <div class="left">
                    <img src="${element.url}" alt="">
                </div>
                <div class="right">
                    <h3>${element.fileTitle}</h3>
                    <p>时间：${timestampToTime(element.createTime)}</p>
                    <p>来源：本站</p>
                </div>
            </div>`)
            });
        }
    })
    $('.newsRight #newJump').val(num)
}