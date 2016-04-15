/*
 * Kbang.com 1.0.0
 * 2016-04-12 15:02:21
 * Copyright (c) 2016 Licensed MIT <> 
 */ 
$(function(){
    var timeArr=[];
    var animationEnd="animationEnd webkitAnimationEnd";
    $("[data-delay]").each(function(i){
        var _this=$(this);
        var _amiClass=_this.attr("data-class");
        var _elCallback=_this.attr("data-callback");
        var time=_this.attr("data-delay")*400;
         clearTimeout(timeArr[i]);
         timeArr[i]=setTimeout(function(){
              _this.removeClass("hide").addClass(_amiClass);
                 _this.on(animationEnd, function() {
                     if(_elCallback){
                         $("."+_elCallback).removeClass(_amiClass).addClass("hide");
                     }else{
                        // _this.removeClass(_amiClass).addClass("");
                     }
                 });

          },time)
    })
})