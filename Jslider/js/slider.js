(function(global) {
	'use strict';
	var Jslider=function(opt){
		var _setting={
			element:"",
			isAutoPlay:true,
			isPage:false,
			duration:4000,
			isVertical:false,
			isLooping:false,
			animateTime:300
		},
		_this=this;
		_this.opts=$.extend(true,_setting,opt);
		_this.sElement=$(_this.opts.element);
		_this.sElementU=_this.sElement.children(".J-outer");
		_this.sElementL=_this.sElementU.children(".J-dom");
		_this.sElementLen=_this.sElementL.length;
		_this.sElementW=_this.sElement.width();
		_this.sElLeftPos=_this.sElementW*2;
		_this.index=0;
		_this.axis = _this.opts.isVertical ? 'Y' : 'X';
		_this.posArr=_this._getPosArr();
        _this._renderWrapper()
        _this._bindHandler();
        _this.opts.isAutoPlay && _this._autoPlay();
	}
	Jslider.prototype={
		_getPosArr:function(){
			var _this=this;
			var posArr=[];
			for(var i=0;i<_this.sElementLen;i++){
				switch(i){
					case 0:
					  posArr.push(0);
					  break;
					case 1:
					  posArr.push(_this.sElementW);
					  break;
					case _this.sElementLen-1:
					  posArr.push(-_this.sElementW);
					  break;
					default :
					  posArr.push(_this.sElLeftPos);
				}
			}
			return posArr;
		},
		_getPosArrTo:function(pArr,idx){
			 var _this=this;
			 var len=_this.sElementLen;
           	  for(var i=0;i<len;i++){
           	   	 if(i==idx){
           	   	 	pArr[i]=0;
           	   	 	if(idx >0)pArr[i-1]=-_this.sElementW;
           	   	 }else{
           	   	 	pArr[i]=_this.sElLeftPos;
           	   	 	if(idx==0)pArr[len-1]=-_this.sElementW;
           	   	 	if(idx==len-1){
           	   	 	  pArr[0]=_this.sElementW;
           	   	 	}else{
           	   	 	  pArr[idx+1]=_this.sElementW;
           	   	 	}
           	   	 	
           	   	 }
           	   }

           	return pArr;
		},
		_renderWrapper:function(){
			var _this=this;
			_this.pre=$("<span class='pre'><</span>");
			_this.next=$("<span class='next'>></span>");
			 var navBtn="<div class='navBtn'>";
			 for(var i=0;i<_this.sElementLen;i++){
			 	navBtn+="<span"+(i==0?" class='active'":'')+"></span>";
			 }
			  navBtn+='</div>';
			_this.sElement.append(navBtn);
			_this.navBtns=_this.sElement.find(".navBtn span");
			_this.sElement.append(_this.pre).append(_this.next);
			_this.sElementL.eq(_this.index).addClass("active");
			
			_this.sElementL.each(function(i){
				$(this).css({"position":"absolute","left":_this.posArr[i],"top":"0px"});
			});
		},
		_bindHandler:function(){
			var _this=this;
			_this.pre.on("click",function(){
				_this._animateFuncs(true);
			})
			_this.next.on("click",function(){
				_this._animateFuncs(false);
			})
			this.navBtns.on("click",function(){
				var index=$(this).index();
				_this.slideTo(index);
			})
		},
		_animateFuncs:function(dir){
			var _this=this;
			var isPreNext=dir?-_this.sElLeftPos:_this.sElLeftPos;
			if(_this.sElementL.is(":animated"))return;
			if(dir){
			   if(_this.index==0){
				  _this.index=_this.sElementLen-1;
			   }else{
				  _this.index--;	
			   }
			  _this.posArr.push(_this.posArr.shift());
			  _this.sElementL.eq(_this.index-1).css("left",-_this.sElLeftPos);
			}else{
			   if(_this.index==_this.sElementLen-1){
				   _this.index=0;
			   }else{
				  _this.index++;	
			   }
			  _this.posArr.unshift(_this.posArr.pop());
			  _this.sElementL.eq(_this.index+1).css("left",_this.sElLeftPos);
			}
			_this.sElementL.each(function(i){
				var pos=_this.posArr[i];
				var $this=$(this);
				if(pos==_this.sElLeftPos){
					$this.css({"left":isPreNext})
				}else{
					$this.animate({"left":pos},_this.opts.animateTime)
				}
			})
			_this.activeMove(_this.index);
		},
		activeMove:function(index){
			var _this=this;
				_this.navBtns.removeClass("active")
				     .eq(index).addClass("active");
			    _this.sElementL.removeClass("active")
			        .eq(index).addClass("active");
		},
		_autoPlay:function(){
			 var _this=this;
            _this.sElement.hover(function() {
                clearInterval(_this.picTimer);
            },function() {
                _this.picTimer = setInterval(function() {
                   _this._animateFuncs(false);
                },_this.opts.duration);
            }).trigger("mouseleave");
		},
		slideTo:function(index){
			 var _this=this;
			 _this.posArr=_this._getPosArrTo(_this.posArr,index);
			 var posPre=index > _this.index?_this.sElementW:-_this.sElementW;
			 var posNext=index > _this.index?-_this.sElementW:_this.sElementW;
			 if(index == _this.index) return;
			 _this.sElementL.eq(_this.index)
			     .animate({"left":posNext},_this.opts.animateTime);
			 
			 _this.sElementL.eq(index).css("left",posPre)
			      .animate({"left":0},_this.opts.animateTime,function(){
			      	  _this.index=index;
			      	  _this.sElementL.each(function(i){
							var pos=_this.posArr[i];
							$(this).css({"left":pos})
			
				      })
			       })
			_this.activeMove(index);
		}

	}
	 global['Jslider'] = global['Jslider'] || Jslider;
})(this || window);