/**
 * Created by lixinyu on 2019/9/4.
 */
$(document).ready(function () {
    /**
     * 加载公共头部和底部
     */
    $('#header').load('header.html');
    $('#footer').load('footer.html');
    /**
     * tab切换
     */
    $('.content_title li').click(function () {
        $(this).attr('class', 'select').siblings('.content_title li').removeAttr('class', 'select');
        $('.content_contact span').eq($(this).index()).attr('class', 'show').siblings('.content_contact span').removeAttr('class', 'show');
    });
    /**
     * 导航栏UI组件;
     */
    $("#menu").menu();
    /**
     * 百度地图
     */
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.3393740000, 39.9886410000);
    map.centerAndZoom(point, 15);
    var marker = new BMap.Marker(point);        // 创建标注
    map.addOverlay(marker);
    // var map = new BMap.Map("allmap");    // 创建Map实例
        // var point=new BMap.Point(116.3393740000, 39.9886410000)
        //  map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
        // var marker = new BMap.Marker(point);        // 创建标注
        // map.addOverlay(marker);
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画


})