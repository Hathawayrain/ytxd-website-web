$(document).ready(function () {
    let categoryId = 70
    let WEBYTXD = 'http://192.168.43.55:6002'
    SuccessCase()
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
    function SuccessCase(){
        $.ajax({
            url:WEBYTXD+"/web/queryArticle?categoryId="+categoryId+"&rows=999&page=1",
            Type:'get',
            datatype:'json',
            success:function(res){
                $('.list').eq(0).append(
                    `<div class="list-box">
                        <a href="./productDetails.html?id=${res.resultList[0].articleId}" target="_blank">
                            <img src="${imgCycle(res.resultList[0].files)}" alt="">
                            <p class="name"><span>${res.resultList[0].articleTitle}</span><br><em>${timestampToTime(res.resultList[0].createTime)}</em></p>
                        </a>
                    </div>
                    <div class="list-box">
                        <a href="./productDetails.html?id=${res.resultList[1].articleId}" target="_blank" class="small-img">
                        <img src="${imgCycle(res.resultList[1].files)}" alt="">
                        <p class="name"><span>${res.resultList[1].articleTitle}</span><br><em>${timestampToTime(res.resultList[1].createTime)}</em></p>
                        </a>
                        <a href="./productDetails.html?id=${res.resultList[2].articleId}">
                        <img src="${imgCycle(res.resultList[2].files)}" alt="">
                        <p class="name"><span>${res.resultList[2].articleTitle}</span><br><em>${timestampToTime(res.resultList[2].createTime)}</em></p>
                        </a>
                    </div>
                    <div class="list-box">
                        <a href="./productDetails.html?id=${res.resultList[3].articleId}" target="_blank" class="small-img">
                        <img src="${imgCycle(res.resultList[3].files)}" alt="">
                        <p class="name"><span>${res.resultList[3].articleTitle}</span><br><em>${timestampToTime(res.resultList[3].createTime)}</em></p>
                        </a>
                        <a href="./productDetails.html?id=${res.resultList[4].articleId}">
                        <img src="${imgCycle(res.resultList[4].files)}" alt="">
                        <p class="name"><span>${res.resultList[4].articleTitle}</span><br><em>${timestampToTime(res.resultList[4].createTime)}</em></p>
                        </a>
                    </div>`
                ),
                $('.list').eq(1).append(
                    `<div class="list-box">
                        <a href="./productDetails.html?id=${res.resultList[5].articleId}" target="_blank">
                        <img src="${imgCycle(res.resultList[5].files)}" alt="">
                        <p class="name"><span>${res.resultList[5].articleTitle}</span><br><em>${timestampToTime(res.resultList[5].createTime)}</em></p>
                        </a>
                    </div>
                    <div class="long-box">
                        <a href="./productDetails.html?id=${res.resultList[6].articleId}">
                        <img src="${imgCycle(res.resultList[6].files)}" alt="">
                        <p class="name"><span>${res.resultList[6].articleTitle}</span><br><em>${timestampToTime(res.resultList[6].createTime)}</em></p>
                        </a>
                    </div>`
                )
                if (res.resultList.length >=7 ) {
                    for (let a=7;a<res.resultList.length;a++) {
                        $('.list').eq(2).children('.all-box').append(
                            `<a href="./productDetails.html?id=${res.resultList[a].articleId}" target="_blank">
                                <img src="${imgCycle(res.resultList[a].files)}" alt="">
                                <p class="name"><span>${res.resultList[a].articleTitle}</span><br><em>${timestampToTime(res.resultList[a].createTime)}</em></p>
                            </a>`
                        )
                    }
                }
            }
        })
    }
})