/*
 *
 * 2016-04-15 15:02:21
 * Copyright (c) 2016 Licensed MIT <> 
 */ 
$(function(){
    var timeArr=[];
    var browser = {
        versions : function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident : u.indexOf('Trident') > -1, //IE内核
                presto : u.indexOf('Presto') > -1, //opera内核
                webKit : u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile : !!u.match(/AppleWebKit.*Mobile.*/)
                || !!u.match(/AppleWebKit/), //是否为移动终端
                ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp : u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
                google:u.indexOf('Chrome')>-1
            };
        }(),
        language : (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    alert(browser.versions.mobile)
    if(browser.versions.mobile) {
        $("[data-url]").on("click", function (ev) {
            var url = $(this).attr("data-url");
            ev.preventDefault;
            window.location.href = url;
        });
    }
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