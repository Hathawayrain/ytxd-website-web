// var path1 = 'http://129.28.187.140:6002'
var path1 = '/mastary'
$(document).ready(function () {
    /**
     * 加载公共头部和底部
     */
    $('#header').load('header.html');
    $('#footer').load('footer.html');

    function imgCycle(imgurl) {
        if (imgurl) {
            let url = ''
            imgurl.forEach(element => {
                if(element.categoryId == 220){
                    url = element.url
                }
            });
            return url
        }else {
            return ''
        }
    }
    /**
     * 轮播图动态数据+swiper插件滚动
     */
    function shuffling(path){
        $.ajax({
            url:`${path}/file/selectCategoryId?categoryId=10`,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                let shuffling = '';
                for (let i =0;i<res.resultList.length;i++){
                    shuffling+= `<div class="swiper-slide"><img src="${res.resultList[i].url}" alt="" style="width: 100%;height: 100%"></div> `
                }
                $('.swiper_lbt').append(shuffling);
                var mySwiper = new Swiper('.swiper-container1', {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    loop: true,
                    autoplay: true,
                    observer: true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true//修改swiper的父元素时，自动初始化swiper
                });
                mySwiper.init();//初始化swiper
            }
        })
    }
    shuffling(path1);
    /**
     * 解决方案数据
     */
    function solution(path){
        $.ajax({
            url:`${path}/web/queryArticle?categoryId=50&rows=4&page=1`,
            type: 'GET',
            dataType: 'json',
            success:function (res) {
                let solution = '<ul class="tab">';
                res.resultList.forEach((item,index)=>{
                    let imagePath = "";
                    if(item.files){
                        for(let i=0; i<item.files.length; i++){
                            if(item.files[i].categoryId === 230){
                                imagePath = item.files[i].url;
                            }
                        }
                    }
                    solution+= ` <li><a href="productDetails.html?id=${item.articleId}" target="_blank"><img src="${imagePath}"><p>${item.articleTitle}</p></a></li>`
                })
                solution += `</ul><div id="tabContent">`
                res.resultList.forEach((item,index)=>{
                    let imagePath = "";
                    if(item.files){
                        for(let i=0; i<item.files.length; i++){
                            if(item.files[i].categoryId === 220){
                                imagePath = item.files[i].url;
                            }
                        }
                    }
                  solution+=`<span class="tab_content" style="background: url('${imagePath}') center no-repeat; background-size:100% 100%" >
                            <p class="text"><i class="redtitle"></i>${item.sketch}</p>
                            <span class="more"><a href="productDetails.html?id=${item.articleId}" target="_blank" class="white">更多详情 &nbsp 》</a></span></span>`
               })
                 solution += `</div>`
                $('#tabs').html(solution)
                $('#tabContent').find(".tab_content").eq(0).attr("id","show");
            }
        })
    }
    solution(path1);
    /**
     * 产品数据
     */
    function product(path) {
        $.ajax({
            url: `${path}/web/queryArticle?categoryId=60&rows=1&page=1`,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                let productTxt = '';
                let productImg = '';
                for(let i=0;i<res.resultList[0].files.length;i++) {
                    if(res.resultList[0].files[i].categoryId === 240){
                        productImg = res.resultList[0].files[i].url;
                    }
                }
                productTxt+= ` <div class="productImg" style="background:url('${productImg}')center no-repeat;background-size:100% 100%;">
                    <div class="productText"><p  class="text"><i class="redtitle"></i>${res.resultList[0].sketch}</p>
             <span class="more"><a href="productDetails.html?id=${res.resultList[0].articleId}" target="_blank" class="white">更多详情 &nbsp 》</a></span></div></div>`
                $('#productImg').html(productTxt);
            }
        })
    }
    product(path1)
    /**
     * 成功案例数据
     */
    function success(path){
        $('#tabSecond .tab2').html('')
        $.ajax({
            url: `${path}/web/queryArticle?categoryId=70&rows=4&page=1`,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                $('#tabSecond .tab2').append(`<li class="select"><a href="productDetails.html?id=${res.resultList[0].articleId}" target="_blank"><p class="caseText">${res.resultList[0].articleTitle}</p><div class="diamond shows"></div></a></li>`)
                $('#tabSecond .tabContent2').append(`<span id="show1"><img src="${imgCycle(res.resultList[0].files)}" alt="" width="100%">
                <div class="caseContent"><p class="caseText2"><i class="redtitle"></i>${res.resultList[0].sketch}</p>
                <span class="more mores"><a href="productDetails.html?id=${res.resultList[0].articleId}" target="_blank" class="red">更多详情 &nbsp 》</a></span>
                </div></span>`)
                for (let a=1;a<res.resultList.length;a++) {
                    $('#tabSecond .tab2').append(`<li><a href="productDetails.html?id=${res.resultList[a].articleId}" target="_blank"><p class="caseText">${res.resultList[a].articleTitle}</p><div class="diamond shows"></div></a></li>`)
                    $('#tabSecond .tabContent2').append(`<span><img src="${imgCycle(res.resultList[a].files)}" alt="" width="100%">
                    <div class="caseContent"><p class="caseText2"><i class="redtitle"></i>${res.resultList[a].sketch}</p>
                    <span class="more mores"><a href="productDetails.html?id=${res.resultList[a].articleId}" target="_blank" class="red">更多详情 &nbsp 》</a></span>
                    </div></span>`)
                }
                // let success =` <ul class="tab2">`
                // res.resultList.forEach((item,index)=>{
                // success+=`<li class="select"><a href="productDetails.html?id=${item.articleId}" target="_blank"><p class="caseText">${item.articleTitle}</p><div class="diamond shows"></div></a></li>`
                // })
                // success+=`</ul><div class="tabContent2">`
                // res.resultList.forEach((item,index)=>{
                //     if(item.files){
                //         let successImg = ''
                //         for(let i=0; i<item.files.length; i++){
                //             if(item.files[i].categoryId === 220){
                //                 successImg = item.files[i].url;
                //             }
                //         }
                        // success+=`<span><img src="${successImg}" alt="" width="100%">
                        // <div class="caseContent"><p class="caseText2"><i class="redtitle"></i>${item.sketch}</p>
                        // <span class="more mores"><a href="productDetails.html?id=${item.articleId}" target="_blank" class="red">更多详情 &nbsp 》</a></span>
                        // </div></span>`
                //     }
                // })
                // success += `</div>`
                // $('#tabSecond').append(success);
                // $('.tabContent2').find(".tabContent2>span").eq(0).attr("id","show1");
            }
        })
    }
    success(path1)
    /**
     * 首页滚屏
     */
    $('#pageContain').fullpage({
        'navigation': true,
    });
})
/**
 * tab切换
 */
$(document).on("mouseover","#tabs .tab li",function(){
    $(this).attr('class', "selected").siblings('li').removeAttr();
    $('#tabContent>span').eq($(this).index()).attr('id', 'show').siblings('#tabContent>span').removeAttr('id', 'show');
})

$(document).on("mouseover","#tabSecond .tab2 li",function(){
    $(this).attr('class', "select").siblings('li').removeClass("select");
    $('.tabContent2>span').eq($(this).index()).attr('id', 'show1').siblings('.tabContent2>span').removeAttr('id', 'show1');
})






