/**
 * Created by lixinyu on 2019/8/21.
 */
$(document).ready(function () {
    /**
     * 加载公共头部和底部
     */
    $('#header').load('header.html');
    $('#footer').load('footer.html');
    /**
     * swiper轮播图
     */
    var swiper = new Swiper('.swiper-container1', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });
    /**
     * 楼层找标签元素的绝对位置.上边距和左边距
     */
    function osp(obj) {
        var l=0;
        var t=0;
        while (obj){
            l=l+obj.offsetLeft;
            t=t+obj.offsetTop;
            obj=obj.offsetParent;
        }
        return{left:l,top:t}
    }
    /**
     * 楼层特效
     */
    function budding() {
        var floor = $(".floor");
        var spaned = $(".budding>span")
        window.onscroll=function () {
            var stop=document.documentElement.scrollTop||document.body.scrollTop;
            let num = 0;
            // 滚动到当前楼层圆圈变大
            for(var i=0;i<floor.length;i++){
                if (stop>=osp(floor[i]).top){
                    num=i;
                }
                spaned[i].className="";
            }
            spaned[num].className="circle-active"
            // 吸顶(回到顶部)
            if (stop>=osp(back).top) {
                back.style.position = 'fixed'
            }else if (stop<4103){
                partner.style.position = 'relative'
                back.style.position = 'absolute'
            }

        }
        //点击圆圈时跳转到当前楼层
        for (var j=0;j<floor.length;j++){
            spaned[j].onclick=function () {
                for (var k=0;k<floor.length;k++){
                    if (this==spaned[k]){
                        document.documentElement.scrollTop=osp(floor[k]).top
                        document.body.scrollTop=osp(floor[k]).top
                    }
                }
            }
        }

    }
    budding();
    /**
     * tab切换
     */
    $('.tab li').mouseover(function () {
        $(this).attr('class', "selected").siblings('li').removeAttr();
        $('#tabContent>span').eq($(this).index()).attr('id', 'show').siblings('#tabContent>span').removeAttr('id', 'show');
    });
    $('.tab2 li').mouseover(function () {
        $(this).attr('class', "select").siblings('li').removeClass("select");
        // $(this).attr('class', "shows").siblings('div').removeClass( "shows");
        // $('#tabContent>span').eq($(this).index()).attr('id', 'show').siblings('#tabContent>span').removeAttr('id', 'show');
    });
    /**
     * 回到顶部
     */
    backtop.onclick=function () {
        function back() {
            var stop=document.documentElement.scrollTop||document.body.scrollTop;
            stop-=300;
            if (stop<=0){
                stop=0;
                clearInterval(time);
            }
            document.documentElement.scrollTop=stop
            document.body.scrollTop=stop
        }
        time=setInterval(back,100)
    }

})

