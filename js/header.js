/*
* @Author: Administrator
* @Date:   2016-02-05 14:03:53
* @Last Modified by:   Administrator
* @Last Modified time: 2016-02-05 16:00:31
*/

'use strict';
//头部组件
$(function () {
    //用户中心列表
    ;(function(){//判断ie6
        var isIE6 = window.navigator.userAgent.toLocaleLowerCase().indexOf('msie 6') !=-1;
        if(isIE6) return;
            $(' #userCenter').hover(
                function(){
                    $(this).find('.review').show();
                    $
                }, function () {
                    $(this).find('.review').hide();
                })//字体图标旋转采用rotate样式
    })();
    //关注我们微信扫码
    ;(function(){
        var $wx = $('.weixin');
        var timer = null;
        $('.focus').hover(
            function () {
                clearTimeout(timer);
                $wx.show();
            }, function () {//二维码延迟消失方便扫码
                setTimeout(function () {
                    $wx.hide() ;
                },500)
        })
    })();
//    顶部悬浮搜索词条
    ;(function () {//top定位高度变化
        var $fixSch = $('.gj-topFixedBar');
        $(window).on('scroll', function () {
            var sTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (sTop > 500) {
                $fixSch.css({ top: '0px' })

            } else {
                $fixSch.css({ top: '-100px' })

            }
        })
    })();
    //顶部公告的展开和关闭
    ;(function () {
        var $imgBox = $('.gj-topNotice .toggleImgBox');
        var $btn = $('.gj-topNotice .btn');
        var $small = $('.gj-topNotice .smallImg');
        var $big = $('.gj-topNotice .bigImg');
        if(!$imgBox) return;//如果没有广告图就不用执行动画
        $btn.on('click',function(){
            var txt = $btn.text();
            if(txt == '展开'){
                $small.animate({'bottom':'-80px'},300, function () {
                    $imgBox.animate({'height':'270px'},300);
                    $btn.text('收起')
                });

            }else {
                $imgBox.animate({'height': '80px'}, 300, function () {
                    $small.animate({'bottom': '0'}, 300)
                    $btn.text('展开')

                });
            }
        })
    })();
    //全部商品分类
    ;(function () {

    })();

    ;(function () {

    })();
    ;(function () {

    })();


});
