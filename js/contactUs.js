/**
 * Created by lixinyu on 2019/9/4.
 */
/**
 * 提交
 */
var WEBYTXD = 'http://172.20.10.4:6002'
$('.sumbit').click(function(){
    let namereg = /^.{1,12}$/
    let telreg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
    let emailreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if ($("input[name='name']") .val() == '' || $("input[name='tel']") .val() == '') {
        alert('姓名，电话不能为空')
        return false
    }
    if (!namereg.test($("input[name='name']").val())) {
        alert ('姓名内容长度最大为12位')
        return false
    }
    if (!telreg.test($("input[name='tel']").val())) {
        alert('电话号码格式不正确')
        return false
    }
    console.log($("input[name='email']").val())
    console.log(emailreg.test($("input[name='email']").val()))
    if ($("input[name='email']").val() !="" && !emailreg.test($("input[name='email']").val())) {
        alert('邮箱格式不正确')
        return false
    }
    $.ajax({
        type:'POST',
        url:WEBYTXD+"/coop/add",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            name:$("input[name='name']") .val(),
            tel:$("input[name='tel']") .val(),
            post:$("input[name='post']") .val(),
            company:$("input[name='company']") .val(),
            area:$("input[name='area']") .val(),
            email:$("input[name='email']") .val(),
            problem:$("textarea[name='problem']").val()
        }), 
        success:function(res){
            alert(res.message)
            $("input[name='name']").val("")
            $("input[name='tel']").val("")
            $("input[name='post']").val("")
            $("input[name='company']").val("")
            $("input[name='area']").val("")
            $("input[name='email']").val("")
            $("textarea[name='problem']").val("")
        }
    })
})
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
     * 百度地图
     */
    //创建和初始化地图函数：
    function initMap() {
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
    }

    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("allmap");//在百度地图容器中创建一个地图
        var point = new BMap.Point(116.3393740000, 39.9886410000);//定义一个中心点坐标
        map.centerAndZoom(point, 17);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }

    //地图事件设置函数：
    function setMapEvent() {
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
    }

    //标注点数组
    var markerArr = [{
        title: "北京远通信德科技有限公司",
         content: "地址: 北京市海淀区 中关村东路89号恒兴大厦5层G室",
        point: "116.3393740000|39.9886410000",
        isOpen: 1,
        icon: {w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12}
    }
    ];

    //创建marker
    function addMarker() {
        for (var i = 0; i < markerArr.length; i++) {
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0, p1);
            var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point, {icon: iconImg});
            var iw = createInfoWindow(i);
            var label = new BMap.Label(json.title, {"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)});
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function () {
                var index = i;
                var _iw = createInfoWindow(i);
                var _marker = marker;
                _marker.addEventListener("click", function () {
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open", function () {
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function () {
                    _marker.getLabel().show();
                })
                label.addEventListener("click", function () {
                    _marker.openInfoWindow(_iw);
                })
                if (!!json.isOpen) {
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })()
        }
    }

    //创建InfoWindow
    function createInfoWindow(i) {
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
        return iw;
    }

    //创建一个Icon
    function createIcon(json) {
        var icon = new BMap.Icon("http://api.map.baidu.com/lbsapi/creatmap/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
            imageOffset: new BMap.Size(-json.l, -json.t),
            infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            offset: new BMap.Size(json.x, json.h)
        })
        return icon;
    }

    initMap();//创建和初始化地图


})