
// 员工关怀hover
$(document).on("click",".careTop .left li",function(){
    $(this).addClass('careToplihover').siblings().removeClass('careToplihover')
    $(this).children('i').addClass('careTopIhover')
    $(this).siblings().children('i').removeClass('careTopIhover')
    $(this).parents('.Employeescare .careTop').children('.right').children('img')
    .eq($('.careToplihover').index()).addClass('caraImg').siblings().removeClass('caraImg')
})
$(document).on("click",".careBootom .left li",function(){
    $(this).addClass('careBottomlihover').siblings().removeClass('careBottomlihover')
    $(this).children('i').addClass('careBottomIhover')
    $(this).siblings().children('i').removeClass('careBottomIhover')
    $(this).parents('.Employeescare .careBootom').children('.right').children('img')
    .eq($('.careBottomlihover').index()).addClass('caraImg').siblings().removeClass('caraImg')
})

// 员工关怀接口
function Employess() {
    $.ajax({
        url:WEBYTXD+"/web/queryArticle?categoryId=210",
        Type:'get',
        datatype:'json',
        success:function(res){
            // console.log(res.resultList)
            $('.Employeescare .careTop>ul').html('')
            $('.Employeescare .careBootom>ul').html('')
            $('.Employeescare .careTop .right').html('')
            $('.Employeescare .careBootom .right').html('')
            $('.Employeescare .careTop>ul').append('<li class="clearfix careToplihover"><div class="divlist clearfix"><h1>01</h1><div><h6>'+res.resultList[0].articleTitle+'</h6><p>'+res.resultList[0].sketch+'</p></div></div><span class="date">'+timestampToTime(res.resultList[0].createTime)+'</span><i class="careTopIhover"></i></li>')
            for (let a = 0;a<res.resultList[0].files.length;a++) {
                if (res.resultList[0].files[a].categoryId == 240 ) {
                    $('.Employeescare .careTop .right').append('<img class="caraImg"src="'+res.resultList[0].files[a].url+'" alt="">')
                }
            }
            for (let a=1; a<3; a++) {
                $('.Employeescare .careTop>ul').append('<li class="clearfix"><div class="divlist clearfix"><h1>0'+(a+1)+'</h1><div><h6>'+res.resultList[a].articleTitle+'</h6><p>'+res.resultList[a].sketch+'</p></div></div><span class="date">'+timestampToTime(res.resultList[a].createTime)+'</span><i></i></li>')
                for (let i=0;i<res.resultList[a].files.length;i++) {
                    if (res.resultList[a].files[i].categoryId == 240) {
                        $('.Employeescare .careTop .right').append('<img src="'+res.resultList[a].files[i].url+'" alt="">')
                    }
                }
            }
            if (res.resultList.length >= 3) {
                for (let a = 0;a<res.resultList[3].files.length;a++) {
                    if (res.resultList[3].files[a].categoryId == 240 ) {
                        $('.Employeescare .careBootom .right').append('<img class="caraImg"src="'+res.resultList[0].files[a].url+'" alt="">')
                    }
                }
                $('.Employeescare .careBootom>ul').append('<li class="clearfix careBottomlihover"><div class="divlist clearfix"><h1>04</h1><div><h6>'+res.resultList[3].articleTitle+'</h6><p>'+res.resultList[3].sketch+'</p></div></div><span class="date">'+timestampToTime(res.resultList[3].createTime)+'</span><i class="careBottomIhover"></i></li>')
                for (let a=4; a<6;a++) {
                    $('.Employeescare .careBootom>ul').append('<li class="clearfix"><div class="divlist clearfix"><h1>0'+(a+1)+'</h1><div><h6>'+res.resultList[a].articleTitle+'</h6><p>'+res.resultList[a].sketch+'</p></div></div><span class="date">'+timestampToTime(res.resultList[a].createTime)+'</span><i></i></li>')
                    for (let i=0;i<res.resultList[a].files.length;i++) {
                        if (res.resultList[a].files[i].categoryId == 240) {
                            $('.Employeescare .careBootom .right').append('<img src="'+res.resultList[a].files[i].url+'" alt="">')
                        }
                    }
                }
            }
        }
    })
    $('.newsRight #newJump').val(num)
}