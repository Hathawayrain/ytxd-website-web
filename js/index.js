// var path1 = 'http://129.28.187.140:6002'
var path1 = 'http://172.20.10.4:6002'
$(document).ready(function () {
    /**
     * 加载公共头部和底部
     */
    $('#header').load('header.html');
    $('#footer').load('footer.html');


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
                    solution+= ` <li><img src="${imagePath}"><p>${item.articleTitle}</p></li>`
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
                             <p class="text">${item.sketch}</p>
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
                    if(res.resultList[0].files[i].categoryId === 220){
                        productImg = res.resultList[0].files[i].url;
                    }
                }
                productTxt+= ` <div class="productImg" style="background:url('${productImg}')center no-repeat;background-size:100% 100%;">
                    <div class="productText"><p  class="text">${res.resultList[0].sketch}</p>
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
        $.ajax({
            url: `${path}/web/queryArticle?categoryId=70&rows=4&page=1`,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                let success =` <ul class="tab2">`
                res.resultList.forEach((item,index)=>{
                success+=`<li class="select"><p class="caseText">${item.articleTitle}</p><div class="diamond shows"></div></li>`
                })
                success+=`</ul><div class="tabContent2">`
                res.resultList.forEach((item,index)=>{
                    if(item.files){
                        let successImg = ''
                        for(let i=0; i<item.files.length; i++){
                            if(item.files[i].categoryId === 220){
                                successImg = item.files[i].url;
                            }
                        }
                        success+=`<span><img src="${successImg}" alt="" width="100%">
                        <div class="caseContent"><p class="caseText2">${item.sketch}</p>
                        <span class="more mores"><a href="productDetails.html?id=${item.articleId}" target="_blank" class="red">更多详情 &nbsp 》</a></span>
                        </div></span>`
                    }
                })
                success += `</div>`
                $('#tabSecond').append(success);
                $('.tabContent2').find(".tabContent2>span").eq(0).attr("id","show1");
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
    $('.tabContent2>span').eq($(this).index()).attr('id', 'show1').siblings('.tabContent2>span').removeAttr('id', 'show2');
})






