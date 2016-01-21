(function(global) {
	'use strict';
	var Jslider=function(opt){
		var _setting={
			element:"",
			isAutoPlay:false,
			isPage:false,
			animateType:"",  //card
			isVertical:true,
			isLooping:false,
			animateTime:300
		},
		_this=this;
		_this.opts=$.extend(true,_setting,opt);
		_this.sElement=$(_this.opts.element);
		_this.sElementU=_this.sElement.children(".J-outer");
		_this.sElementL=_this.sElementU.children(".J-dom");
		_this.sElementCurr=_this.sElement.children(".J-dom.z-current")
		_this.sElementWH=[_this.sElement.width(),_this.sElement.height()];                   
		_this.totalPage=_this.sElementL.length;                                      //总页数
		_this.movePageNum=1;                                                         //当前滑动的页
		_this.nowPageNum = 0;                                                        //当前页
		_this.isMovestart = true;
		_this.isDir=null;                                                            
		_this.axis = _this.opts.isVertical ? 'Y' : 'X';                              //判断横向滚动
		_this.moveNum=_this.opts.isVertical?_this.sElementWH[1]:_this.sElementW[1];
		
        _this._renderWrapper()
        _this._bindHandler();
//      _this.opts.isAutoPlay && _this._autoPlay()
	}
	Jslider.prototype={
		_renderWrapper:function(){
			var _this=this;
			_this.pre=$("<span class='pre'><</span>");
			_this.next=$("<span class='next'>></span>");
			_this.navBtns=_this.sElement.find(".navBtn span");
			_this.sElement.append(_this.pre).append(_this.next);
			_this.sElementL.eq(_this.index).addClass("active");
		},
		_bindHandler:function(){
			var _this=this;
            var hammer = new Hammer(_this.sElement[0]);
	            hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL, threshold: 10 });
	            hammer.on("press", function (ev) {
	            	var index = _this._getNowIndex();
	            	 _this.sElementL.eq(index).addClass("z-move").css({
		                    "transition": "none"
		             });
	                if (ev.target.tagName == "TEXTAREA") {
	                    ev.target.focus();
	                }
	            })
	             hammer.on("pressup", function (ev) {
	            	var index = _this._getNowIndex();
	            	 _this.sElementL.eq(index).removeClass("z-move")
	            })
	            
	            hammer.on('panstart',Hammer.bindFn(_this._pageTouchStart, _this));
		 		hammer.on('panup pandown',Hammer.bindFn(_this._pageTouchMove, _this));
		 		hammer.on('panend',Hammer.bindFn(_this._pageTouchEnd, _this));
		 		_this.pre.on("click",function(){
		 			_this.nextPre("pandown");
				})
				_this.next.on("click",function(){
					_this.nextPre("panup");
				});
	    },
	    nextPre:function(dir){
	    	var _this=this;
	    	if(!_this.isMovestart)return;
			_this.direction=dir;
			_this.slideTo(dir,0);
			this.isMovestart=false;
			setTimeout(function(){
				_this._watchTransitionEnd();
			},10)
	    },
		_pageTouchStart:function(ev){
			var _this=this;
			if(!_this.isMovestart)return;
			_this.direction='';
			_this.sElementU.children(".J-dom.z-current").css({
				    "transition": "none",
                    "-webkit-transition": "none",
                    "transform": "translateY(0px)",
                    "-webkit-transform": "translateY(0px)"
            });
		},
		_pageTouchMove:function(ev){
			ev.preventDefault();
			var _this=this;
		    if(!_this.isMovestart)return;
		    
			if (_this.direction == "pandown") {
                _this.slideTo("pandown",ev.distance);
                return;
            }
			if (_this.direction == "panup") {
            	_this.slideTo("panup",ev.distance);
                return;
            }
			_this.direction=ev.type;
			_this.slideTo(ev.type,ev.distance);
		},
		_getNowIndex:function(){
			var _this=this;
		    return _this.sElementU.children(".J-dom.z-current").index();
		},
		_pageTouchEnd:function(ev){
			var _this=this;
			if(!_this.isMovestart)return;
			this.isMovestart=false;
			_this._watchTransitionEnd(ev);
		},
		slideTo:function(type, distance){
			 var _this=this;
			 _this.movePageNum=_this._getMoveIndex(_this.nowPageNum);
			 var mW= type == "panup" ? _this.moveNum - distance : -_this.moveNum + distance;
			 var transform="translateY("+mW+"px)";
			 var scale = _this.opts.animateType=='card'?(1 - Math.abs(distance*0.8/_this.moveNum)).toFixed(3):1;
			 _this.isDir=type == "panup"?"top":"bottom";
			_this.sElementL.eq(_this.nowPageNum).removeClass("z-active")
			   .addClass("z-current z-move").css({
                "transition": "none",
                "-webkit-transition": "none",
                "transform": "scale("+scale+")",
                "-webkit-transform": "scale("+scale+")",
                "transform-origin":"center "+ _this.isDir+" 0px",
                "-webkit-transform-origin":"center "+ _this.isDir+" 0px"
            });
            _this.sElementL.eq(_this.movePageNum).addClass("z-active z-move").css({
            	"transition": "none",
                "-webkit-transition": "none",
                "transform": transform,
                "-webkit-transform":transform,
            });
		},
		_getMoveIndex:function(nowIndex){
			var _this=this,movePageNum=null;
			if(_this.direction=='pandown'){
				if (nowIndex > 0) {
					movePageNum = nowIndex - 1;
	            } else {
	                movePageNum = _this.totalPage-1;
	            }
			}else{
				if (nowIndex < _this.totalPage-1) {
					movePageNum =nowIndex + 1;
	            } else {
	                movePageNum = 0;
	            }
			}
			return movePageNum;
		},
        _watchTransitionEnd:function(ev){
        	var _this=this;
        	var distance = (ev && ev.distance) || 100;
        	var movePage=_this.sElementL.eq(_this.movePageNum);
        	var nowPage=_this.sElementL.eq(_this.nowPageNum);
        	var moveN=_this.direction == "panup" ? _this.moveNum : -_this.moveNum;
        	var transform=distance > 50 ? "translateY(0px)" : "translateY("+moveN+"px)";
        	//console.log(_this.movePageNum+"="+nowIndex)
        	if(_this.opts.animateType=='card'){
        		var isScale=distance < 50?"1":"0.2";
	        	nowPage.removeAttr("style").css({
	        		"transition":"transform .4s linear",
	        		"-webkit-transition":"-webkit-transform .4s linear",
	        		"transform": "scale("+isScale+")",
	                "-webkit-transform": "scale("+isScale+")",
	                "transform-origin":"center "+ _this.isDir+" 0px",
	                "-webkit-transform-origin":"center "+ _this.isDir+" 0px"
	        	});
        	}
        	movePage.css({
                "transition": "transform .4s linear",
                "-webkit-transition": "-webkit-transform .4s linear",
                "transform": transform,
                "-webkit-transform": transform
            
        	});
	       var time = setInterval(function () {
                    clearInterval(time);
	                if(distance < 50 ){
		            	nowPage.removeClass("z-current z-active z-move").addClass("z-current")
		            	.css({
		            		"transition":"transform .4s linear",
		            		"-webkit-transition":"-webkit-transform .4s linear",
		            		"transform":"translateY(0px)",
		            		"-webkit-transform":"translateY(0px)"
		            	}).removeAttr("style");
		            	movePage.removeAttr("style").removeClass("z-active z-move");
		            }else{
		            	if(_this.opts.animateType=='card'){
			                nowPage.removeAttr("style").css({
			                	"transition": "none",
	                            "-webkit-transition": "none",
			                	"transform": "scale(0.2)",
	                            "-webkit-transform": "scale(0.2)",
	                            "transform-origin":"center "+ _this.isDir+" 0px",
	                            "-webkit-transform-origin":"center "+ _this.isDir+" 0px"
			                })
		                }
		                nowPage.removeClass("z-current z-active z-move");
	            	    movePage.removeClass("z-active z-move").addClass("z-current");
	            	    _this.nowPageNum=_this._getNowIndex();
	            	    _this.movePageNum=_this._getMoveIndex(_this.nowPageNum);
		            }
		           _this.isMovestart=true;
	            },410)
        }
	}
	 global['Jslider'] = global['Jslider'] || Jslider;
})(this || window);