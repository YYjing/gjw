/*----------------------------------------全局组件-----s-------------------------------------------*/
/*--------侧边按钮tips---s-------*/
 

function rightBar() {

    var $rbBtn = $('.rb_btn');
    if (!$rbBtn) return;
    $rbBtn.hover(
				            function () {
				                $(this).find('.iconBox_tips').css('display', 'block')
							            .stop().animate({
							                opacity: 1,
							                right: 32 + 'px'
							            })
				            },
				            function () {
				                $(this).find('.iconBox_tips').stop().animate({
				                    opacity: 0,
				                    right: 80 + 'px'
				                }, function () {
				                    $(this).css('display', 'none');
				                })
				            }
		            )
    var isIe6 = window.navigator.userAgent.toLowerCase().indexOf('msie 6') != -1;
    function Ie6Fixed() {
        if (isIe6) {
            var viewH = document.documentElement.clientHeight;
            var sTop = document.documentElement.scrollTop || document.body.scrollTop;
            var $rightFixedBar = $('.rightFixedBar');
            $rightFixedBar.css({
                height: viewH + 'px',
                top: sTop + 'px',
                display: 'block'
            });
        }

    }
    Ie6Fixed();
    $(window).bind('scroll resize', function () {
        Ie6Fixed();
    })
    $('#rightBar_backTop').bind('click', function (ev) {

        $('html,body').stop().animate({ scrollTop: 0 });
        ev.preventDefault()
    })
}
rightBar()
/*--------侧边按钮tips---e-------*/

require(['http://www.gjw.com/v6/plugins/jquery.SuperSlide.2.1.1.js'], function () {
    /*--------友情链接滚动---S-------*/
    function friendLinkScroll() {
        var $linkBox = $('.frendLinkBox');
        if (!$linkBox) return;
        $linkBox.slide({
            mainCell: '.friendLinkList',
            autoPlay: true,
            effect: 'topLoop',
            easing: 'swing',
            interTime: 2000,
            delayTime: 700
        })
    }
    friendLinkScroll();
    /*--------友情链接滚动---e-------*/
});
   
/*------------------------------------------全局组件----e--------------------------------------------*/