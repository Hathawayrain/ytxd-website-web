//找到所有指定类名的标签元素
function getcls(obj) {
    var ele=document.all?document.all:document.getElementsByTagName("*");
    var arr=[];
    for (var i=0;i<ele.length;i++){
        if (ele[i].className==obj){
            arr.push(ele[i]);
        }
    }
    return arr;
}
//通过制定的id缩小范围后,找到指定id的标签里的所有标签元素,
function getbyid(preid,obj) {
    var pid=document.getElementById(preid);
    var ele=pid.all?pid.all:pid.getElementsByTagName("*");
    var arr=[];
    for (var i=0;i<ele.length;i++){
        if (ele[i].className==obj){
            arr.push(ele[i]);
        }
    }
    return arr;
}
//封装一个方法通过id查找标签元素
function getid(obj) {
    return document.getElementById(obj);

}
//封装一个方法通过类标签名查找标签元素
function gettag(obj) {
    return document.getElementsByTagName(obj);
}
//封装一个方法,处理获取非行间样式的兼容写法
function getstyle(obj,attr) {
    if (obj.currentStyle){
        return obj.currentStyle[attr]
    }else {
        return window.getComputedStyle(obj,null)[attr]
    }
}
//封装一个方法,来处理获取下一个标签类型的兄弟节点的兼容性。
function next(obj) {
    if (obj.nextElementSibling){
        return obj.nextElementSibling;
    }else {
        return obj.nextSibling;
    }
}
//封装一个方法来获取上一个标签类型的兄弟节点的兼容性
function previous(obj) {
    if (obj.previousElementSibling){
        return obj.previousElementSibling
    }else {
        return obj.previousSibling
    }
}
//封装一个方法来处理获取第一个子节点的兼容性
function first(obj) {
    if (obj.firstElementChild){
        return obj.firstElementChild;
    }else {
        return obj.firstChild;
    }
}
//封装一个方法来处理获取最后一个子节点的兼容性
    function last(obj) {
    if (obj.lastElementChild){
        return obj.lastElementChild;
    }else {
        return obj.lastChild;
    }
}

//事件监听器兼容性。 obj是绑定元素, evenname是传绑定事件,handler是传函数
function add(obj,eventname,handler) {
    if(document.attachEvent){
        obj.attachEvent("on"+eventname,handler); //ie事件必须加on
    }else {
        obj.addEventListener(eventname,handler,false);
    }
}
//移除事件监听器兼容性
function rem(obj,eventname,handler) {
    if (document.detachEvent){
        obj.detachEvent("on"+eventname,handler);
    }else {
        obj.removeEventListener(eventname,handler,false);
    }
}
//阻止浏览器的默认行为的兼容性
function prevent(evt) {
    var event=evt||window.event;
    if (event&& event.preventDefault){
        event.preventDefault();
    }else {
        event.returnValue=false;
    }
}
//阻止冒泡语句兼容写法
function bubble(evt) {
    var event=evt||window.event;
    if (evt&&event.stopPropagation){
        event.stopPropagation();
    }else {
        event.cancelBubble=false;
    }
}

//获取当前的时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

//找标签元素的绝对位置 上边距和左边距
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
