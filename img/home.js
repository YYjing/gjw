/*----------------------------------------首页模块-----s-------------------------------------------*/
$(function () {
    /*-------大轮播s-------*/
    function focusPicPlay() {
        var $titCell = $('.focusBox_titCell');
        var iH = $titCell[0].offsetWidth;
        $titCell[0].style.marginLeft = '-' + parseInt(iH / 2) + 'px';
        $('.focusBox').slide({
            mainCell: '.focusBox_inner',
            autoPlay: true,
            effect: 'fold',
            easing: 'swing',
            interTime: 5000,
            delayTime: 700,
            titOnClassName: 'active',
            titCell: '.focusBox_titCell span'
        })
    }
    focusPicPlay();
    var iDh = document.documentElement.clientHeight;
    $('.focusBox_inner,.focusBox_inner li').css({ width: '100%' });
    /*-------大轮播e-------*/

    /*-------顶部广告滑动s-------*/
    $('.slideAd_container').slide({
        mainCell: '.slidePic',
        effect: 'leftLoop',
        prevCell: '.slideAd_prevBtn',
        nextCell: '.slideAd_nextBtn'
    })
    /*-------顶部广告滑动e-------*/



    /*-----------楼层轮播s-----------*/
    $('.gjw_slideBox').find("li img").css({ width: 440 + 'px', height: '237px' })
    $('.gjw_slideBox').slide({
        mainCell: '.gjw_slideBody',
        autoPlay: true,
        effect: 'leftLoop',
        easing: 'swing',
        interTime: 3000,
        delayTime: 700,
        titOnClassName: 'active',
        prevCell: '.gjw_slidePrev',
        nextCell: '.gjw_slideNext',
        titCell: '.gjw_slideNav a'
    });
    /*-----------楼层轮播e-----------*/
    /*楼层选项卡s*/
    $('.gjw_tab').gjwTab(
		{
		    titCell: '.gjw_tabItemBox .tab_btn',
		    tabCell: '.gjw_tabBox',
		    active: 'active'
		}
	);
    /*楼层选项卡e*/


    /*----楼层跳转----S*/
    function floorNav() {
        var isIe6 = window.navigator.userAgent.toLowerCase().indexOf('msie 6') != -1;
        if (isIe6) return;
        var $floorNav = $('.floorNav');
        var $aNavCard = $floorNav.find('.card');
        var $floor = $('.floor');
        var len = $floor.length;
        function init() {

            $(window).bind('scroll resize', function () {
                var iTop = document.documentElement.scrollTop || document.body.scrollTop;
                navShow();
                scrollHightlight();
            });
            handleClick();
        }
        init();
        function navShow() {
            var iTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (iTop > 600) {
                $floorNav.fadeIn('fast');
            } else {
                $floorNav.fadeOut('fast');
            }
        }
        function getPos($ele) {
            var hash = $ele.attr('href').substring(1);
            var iPos = $('#' + hash).offset().top;
            return iPos;
        }
        function scrollHightlight() {
            var iTop = document.documentElement.scrollTop || document.body.scrollTop;
            for (var i = 0; i < len; i++) {
                var iNext = i + 1;
                if (iNext >= len) {
                    iNext = len - 1;
                }
                var iNowFloorTop = getPos($aNavCard.eq(i));
                var iNextFloorTop = getPos($aNavCard.eq(iNext));
                if (i != len - 1 && iTop >= iNowFloorTop - 300 && iTop < iNextFloorTop) {
                    $aNavCard.removeClass('active');
                    $aNavCard.eq(i).addClass('active');
                } else if (i == len - 1 && iTop >= iNowFloorTop - 300) {
                    $aNavCard.removeClass('active');
                    $aNavCard.eq(i).addClass('active');
                }
            }
        }

        function handleClick() {
            $aNavCard.bind('click', function (ev) {
                var iPos = getPos($(this))
                $('html,body').stop().animate({ scrollTop: iPos - 70 });
                ev.preventDefault()
            })
        }
        $('#floatNav_backTop').bind('click', function (ev) {

            $('html,body').stop().animate({ scrollTop: 0 });
            ev.preventDefault()
        })
    }
    floorNav();
    /*----楼层跳转----E*/



})
/*----------------------------------------首页模块-----e-------------------------------------------*/


/*---------------------------------------首页的一些兼容s-------------------------------------------*/
$(function(){
		var isIe6 = window.navigator.userAgent.toLowerCase().indexOf('msie 6')!=-1 ;
		var isIe7 = window.navigator.userAgent.toLowerCase().indexOf('msie 7')!=-1 ;
		var isIe8 = window.navigator.userAgent.toLowerCase().indexOf('msie 8')!=-1 ;
		var isIe678 = isIe6 || isIe7 || isIe8;
		//alert(isIe678)
		//针对ie678不支持伪类
		if(isIe678){ 
			$('.flashBuy_proTxt').last().css('border-right','none');
			$('.gjw_tabSideNav').find('li:nth-child(4n)').css('border-right','none');
		};

		/*针对ie6不支持a标签以外的hover*/
			if(isIe6){
				$('.fixedTopBar_dropList').bind('mouseenter',
					function(){
						$(this).css({background:'#fff',border:'1px solid #ddd'});
					}
				)
				$('.fixedTopBar_dropList').bind('mouseleave',
					function(){
						$(this).css({background:'transparent',border:'none'});
					}
				)
				
				
			}
			 
		/*针对ie6不支持a标签以外的hover*/
		
			
});
/*---------------------------------------首页的一些兼容s-------------------------------------------*/