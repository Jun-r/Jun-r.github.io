/*
 *
 * 2016-04-15 15:02:21
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
          },time)
    })
})