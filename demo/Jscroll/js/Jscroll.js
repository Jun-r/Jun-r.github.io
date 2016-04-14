 /*
  *@Author: Jun
  */
(function() {
	//自定义滚动条
	function Jscroll(self,options){
	 var _self=this;
		 _self.nowTop = 0;
	     _self.scroll=self;
	     _self.Jscroll=$(_self.scroll);
	     _self.init();
	}
	Jscroll.prototype={
		 init:function(){
	 	  var _self=this,
	 	      jscrollwp=_self.Jscroll.wrapInner("<div class='ui-jscroll-wp'></div>"),
	 	      scrollBarhtml='<div class="ui-scrollBar"><span class="scrollBarV"></span></div>';
		     _self.scrollbox=_self.Jscroll.children(".ui-jscroll-wp");
		     _self.scrollboxHeight=_self.scrollbox.height();
		     _self.JscrollHeight=_self.Jscroll.height();

		     //判断内容区大于固定高度时执行
		     if(_self.scrollboxHeight>_self.JscrollHeight){
		     	 _self.Jscroll.append(scrollBarhtml);
		         _self.scrollBar=_self.Jscroll.children('.ui-scrollBar');
		         _self.scrollBarV=_self.scrollBar.children();
			     _self.scrollBarHeight = (_self.JscrollHeight / _self.scrollboxHeight) * _self.JscrollHeight;
			     _self.scrollBarV.css("height",_self.scrollBarHeight);
			     _self.mousewheel();
			     _self.handleMove();
		     }
		 },
		 handleMove:function(e) {
		    var _self=this,
		        isMove = false,
		        scrollY=0;
		       _self.scrollBarV.on('mousedown', function (event) {
	                event.preventDefault();
	                event.stopPropagation();
	                isMove = true;
	                scrollY=event.pageY-parseInt($(this).css("top"));
	            });
	            $(document).on('mousemove', function (event) {
	            	var scrollBarY = event.pageY - scrollY;
	            	if (scrollBarY < 0) {
						scrollBarY = 0;
					} else if (scrollBarY > (_self.JscrollHeight - _self.scrollBarHeight)) {
						scrollBarY = _self.JscrollHeight - _self.scrollBarHeight;
					}
					if(isMove){
						_self.nowTop = - (_self.scrollboxHeight - _self.JscrollHeight) * scrollBarY / (_self.JscrollHeight - _self.scrollBarHeight);
						_self.getscrollVal(_self.nowTop)
					}
	    
	            }).on('mouseup', function (event) {
	                 isMove = false;
	            });
		 },
		 mousewheel:function(){
		 	    var _self=this;
		 	    _self.Jscroll.mousewheel(function(event,delta){
					event.preventDefault();
					//delta表示滚轮方向。往下滚，-1；往上滚是1。
					_self.nowTop = _self.nowTop + delta * 20;
					_self.getscrollVal(_self.nowTop)//nowTop永远是负数！！
				});
		 	    
		 },
		 getscrollVal:function(nowTop){
		 	var _self=this;
		 	if(_self.nowTop > 0){
		          _self.nowTop = 0;
			}else if(_self.nowTop < _self.JscrollHeight - _self.scrollboxHeight){
				_self.nowTop = _self.JscrollHeight - _self.scrollboxHeight;
			}
			var scrollBarY = _self.nowTop * (_self.JscrollHeight - _self.scrollBarHeight) / (_self.scrollboxHeight - _self.JscrollHeight);
			_self.scrollbox.css("top",_self.nowTop);
			_self.scrollBarV.css("top",-scrollBarY);
		 },
		 refresh:function(){
		 	 var _self=this;
	     	_self.scrollboxHeight=_self.scrollbox.height();
	     	_self.scrollBarHeight = (_self.JscrollHeight / _self.scrollboxHeight) * _self.JscrollHeight;
	     	var offtop=_self.scrollBarV.css("top") || 0;
	     	_self.getscrollVal(offtop);
			_self.scrollBarV.css({"height":_self.scrollBarHeight});
			if(_self.scrollboxHeight<_self.JscrollHeight){
				_self.destroy()
			}
	     },
		 destroy:function(){
		 	 var _self=this;
		 	 _self.scrollBar.remove();
		 	 _self.scrollbox.parent().removeAttr("data-scroll").children().children().unwrap();
		 }
	 }
	var uuid=0;
	$.fn.Jscroll = function(options) {
		var scrollApis = [];
		this.each(function() {
			var scrollApi = null;
			var self = this;
			var id = self.getAttribute('data-scroll');
			if (!id) {
				id = ++uuid;
				var _options = $.extend({}, options);
				$.data[id] = scrollApi = new Jscroll(self,_options);
				self.setAttribute('data-scroll', id);
			} else {
				scrollApi = $.data[id];
			}
			scrollApis.push(scrollApi);
		});
		return scrollApis.length === 1 ? scrollApis[0] : scrollApis;
	};
})();
