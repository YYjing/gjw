(function($){
	$.fn.gjwTab = function(opts){
		return $(this).each(function(){
			if(!opts)return;//如果不传参就返回
			opts.nav = opts.nav || false;
			var $atits = $(this).find(opts.titCell);//tab栏的标题栏
			var $aTab = $(this).find(opts.tabCell);//tab栏的内容栏
			var _this = this;
			$atits.bind('mouseenter',function(){
				var index = $(this).index();//记录index值，方便tab栏的一一对应
				_this.timer = setTimeout(function(){//延时定时器，防止迅速滑动的闪动
					if(opts.active){
						$atits.eq(index).addClass(opts.active)//排他思想，为自己添加类名，所有兄弟移出类名
							.siblings(opts.titCell).removeClass(opts.active);
					}
					$aTab.eq(index).css('display','block')
						.siblings(opts.tabCell).css('display','none');//排他思想
				},200);
			});
			$atits.bind('mouseleave',function(){
				clearTimeout(_this.timer);

			});
			if(opts.nav){
				$(this).bind('mouseleave',function(){
					$aTab.css('display','none');
				})
			}
		})
	}
})(jQuery)
/*

	$(ele).gjwTab(
		{
			titCell:按钮组,
			tabCell:切换组,
			active:按钮当前样式,
			nav:是否是顶部导航,离开容器切换组消失
		}
	);

*/	