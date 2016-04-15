/*
 *
 * 2016-04-15 15:02:21
 * Copyright (c) 2016 Licensed MIT <> 
 */ 
$(function(){
    var timeArr=[];
    var system = {
        win: false,
        mac: false,
        xll: false,
        ipad:false
    };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
    //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
    if (system.win || system.mac || system.xll||system.ipad) {
       alert("1")
    } else {
        alert("2")
    }
    //if(browser.versions.mobile) {
    //    $("[data-url]").on("click", function (ev) {
    //        var url = $(this).attr("data-url");
    //        ev.preventDefault;
    //        window.location.href = url;
    //    });
    //}
    var animationEnd="animationEnd webkitAnimationEnd";
    $("[data-delay]").each(function(i){
        var _this=$(this);
        var _amiClass=_this.attr("data-class");
        var _elCallback=_this.attr("data-callback");
        var time=_this.attr("data-delay")*400;
         clearTimeout(timeArr[i]);
         timeArr[i]=setTimeout(function(){
              _this.removeClass("hide").addClass(_amiClass);
          },time)
    });

})