(function($){
	$.fn.gjwTab = function(opts){
		return $(this).each(function(){
			if(!opts)return;
			opts.nav = opts.nav || false;
			var $atits = $(this).find(opts.titCell);
			var $aTab = $(this).find(opts.tabCell);
			var timer = null;
			var _this = this;
			$atits.bind('mouseenter',function(){
				var index = $(this).index();
				_this.timer = setTimeout(function(){
					if(opts.active){
						$atits.eq(index).addClass(opts.active)
							.siblings(opts.titCell).removeClass(opts.active);
					}
					$aTab.eq(index).css('display','block')
						.siblings(opts.tabCell).css('display','none');
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