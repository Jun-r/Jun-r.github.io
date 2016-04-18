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
    $("[data-url]").on("click", function (ev) {
        var url = $(this).attr("data-url");
        if (system.win || system.mac || system.xll||system.ipad) {

        } else {
            ev.preventDefault;
            window.location.href = url;
        }

    });
    if (system.win || system.mac || system.xll||system.ipad) {
       //alert("1")
    } else {
        //alert("2")
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
    //logo
    $(document).ready(function () {
        YugenLogo.initialize( {
            framerate: 80,

            width: 160,
            height: 180,

            colorSpeedFactor: 0.4,
            morphSpeedFactor: 0.4,
            introSpeedFactor: 2,
            outroSpeedFactor: 2,

            morphStrengthFactor: 0.8,

            morphBaseSpeedFactor: 0.2,
            normalOffsetFactor: 1.5,

            maxShapeRotation: 0.3,

            wordOffsetX: 0,
            wordOffsetY: 0,

            wordScale: 1,

            foregroundScaleX: 0.42,
            foregroundScaleY: 0.58,
            backgroundScaleX: 0.37,
            backgroundScaleY: 0.72,

            shadowAlpha: 0.1,

            shapeQuality: 9,

            containerID: "logo-bg",
            logoCanvasID: "logo-canvas",

            colors:[
                [new YugenLogo.util.Color(250, 250, 250), new YugenLogo.util.Color(0, 0, 0)],
                [new YugenLogo.util.Color(0, 0, 0), new YugenLogo.util.Color(250, 250, 250)]
            ],

            inputs: [
                YugenLogo.input.move,
                YugenLogo.input.press
            ],

            fallbackImages: [

            ]
        });
    });

})