$(document).ready(function () {
    /**
     * 加载公共头部和底部
     */
    $('#header').load('header.html');
    $('#footer').load('footer.html');
    let categoryId = 130
    let WEBYTXD = 'http://192.168.43.55:6002'
    /**
     * tab切换
     */
    techCenter()
    techNology()
    $('.content_title li').click(function () {
        $(this).attr('class', 'select').siblings('.content_title li').removeAttr('class', 'select');
        $('.content>div').eq($(this).index()).attr('class', 'show').siblings('.content>div').removeAttr('class', 'show');
    });
    function techCenter(){
        categoryId = 130
        $.ajax({
            url:WEBYTXD+"/web/queryArticle?categoryId="+categoryId+"&rows=999&page=1",
            Type:'get',
            datatype:'json',
            success:function(res){
                res.resultList.forEach(element => {
                    $('.show').append(
                    `<div class="item">
                    <p class="trigon"></p>
                    <a href="productDetails.html?id=${element.articleId}" target="_blank">
                    <p class="introduce">
                        <span class="c-tit">${element.articleTitle}</span>
                        <span class="intro">${element.sketch}</span>
                    </p>
                    </a>
                    </div>`
                    )
                    for (let i=1;i<element.files.length;i++) {
                        if (element.files[i].categoryId == 240) {
                            $('.item').append(`<img src="${element.files[i].url}" alt="">`)
                        }
                    }
                });
            }
        })
    }
    function techNology(){
        categoryId = 140
        $.ajax({
            url:WEBYTXD+"/web/queryArticle?categoryId="+categoryId+"&rows=999&page=1",
            Type:'get',
            datatype:'json',
            success:function(res){
                res.resultList.forEach((element,index) => {
                    $('.techNology').append(`<div class="tech-item">
                    <p class="num">
                      <span class="star">
                        <img src="./img/techCenter/star1.png" alt="">
                        <img src="./img/techCenter/star1.png" alt="">
                        <img src="./img/techCenter/star1.png" alt="">
                        <img src="./img/techCenter/star2.png" alt="">
                        <img src="./img/techCenter/star2.png" alt="">
                      </span>
                      <span class="order">${index+1}</span>
                     
                    </p>
                    <p class="tit">
                      <span class="tit-con">${element.articleTitle}</span>
                      <span class="desc">${element.sketch}</span><br>
                      <a href="./productDetails.html?id=${element.articleId}" target="_blank"><em>更多详情 ></em></a>
                    </p>
                  </div>`)
                });
            }
        })
    }
})