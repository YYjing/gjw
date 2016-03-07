(function($){
	$.fn.myCarousel = function(opts){
		//闭包所以是return函数
		return $(this).each(function(){
			if(!opts)return;//如果不传参就返回
			//获取元素
			var $imgBox = $(this).find(opts.imgBox);
			var $points = $(this).find(opts.points);
			var width = opts.width;

			var index = 1;
			var _this = this;
			$(this).find(opts.pointBox).on({
				'mouseover':function () {
					clearInterval(_this.timer);
				},
				'mouseout': function () {
					_this.timer = setInterval(function () {
						index++;
						aniMove($imgBox,3,width);
						setPoint();
					},1000)
				}
			})
			 $(this).find('.slider-ctrl-next').on('click', function () {
				 //console.log($imgBox);
				 console.log(width);
					index++;
					aniMove($imgBox,3,width);
					setPoint();
			 })
			 $(this).find('.slider-ctrl-prev').on('click', function () {
				 index--;
				 aniMove($imgBox,3,width);
				 setPoint();
			 })

			$points.each(function (i,ele) {
				$(this).on('mouseover', function () {
					index = i+1;
					aniMove($imgBox,3,width);
					setPoint();
				})
			})

			//小圆点切换事件
			function setPoint(){
				$points.removeClass('now');
				var pointIndex = index;
				if(pointIndex >= 4){
					pointIndex = 1;
				}else if(pointIndex <= 0){
					pointIndex = 3;
				}
				$points.eq(pointIndex-1).addClass('now');
			}
			//左右按钮点击图片切换事件
			function aniMove($ul,num,scroWidth){
				$ul.animate({'left':-index*scroWidth},300,function(){
					if(index >= (num+1)){
						index = 1;
						$ul.css('left',-scroWidth);
					}else if(index <= 0){
						index = num;
						$ul.css({'left':-num*scroWidth});
					}
				});
			}
		})
	}
})(jQuery)
