/*
 * @Author: Administrator
 * @Date:   2016-02-05 14:03:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-03-07 10:49:05
 */

'use strict';
//首页轮播图,淡入淡出效果
;
(function() {
  var i = 1;
  var timer = null;
  var $img = $('.compCarousel li');
  //    圆点的变化
  var $point = $('.pointBox span');
  $img.hide(); //所有元素隐藏
  $img.eq(0).show(); //初始化第一个元素显示
  $point.removeClass('active');
  $point.eq(0).addClass('active'); //初始化
  timer = setInterval(carousel, 3000);
  $('.compCarousel').on('mouseover', function() {
    clearInterval(timer);
  }).on('mouseout', function() {
    timer = setInterval(carousel, 3000);
  });
  //圆点点击事件
  $point.each(function(index) {
    $(this).on('mouseover', function() {
      i = index;
      carousel();
    })
  })

  function carousel() {
    i = i > 7 ? 0 : i;
    i = i < 0 ? 7 : i;
    $point.removeClass('active');
    $point.eq(i).addClass('active');
    $img.fadeOut();
    $img.eq(i).fadeIn();
    i++;
  }

})();
//右边固定栏滑动
;
(function() {
  $('.iconBox').on({
      'mouseenter': function() {

        $(this).next('.rightBar').show().animate({
          right: '32px',
          opacity: 1,
        }, 500)
      },
      'mouseleave': function() {
        $(this).next('.rightBar').hide().animate({
          right: '80px',
          opacity: 0,
        }, 500)
      }
    })
    //    返回顶部按钮
  $('.goTop').on('click', function(e) {
    $('html,body').stop().animate({ scrollTop: 0 });
    e.preventDefault() //防止a标签的默认行为
  })
})();
//特卖会左右轮播图组件
;
(function() {
  $('.sale .gjw-myBtn').css('opacity', 0);
  $('.sale .slideBox').on({
      'mouseover': function() {
        $(this).find('.gjw-myBtn').css('opacity', 1);
      },
      'mouseout': function() {
        $(this).find('.gjw-myBtn').css('opacity', 0);
      }
    })
    //获取dom元素
  var scroWidth = $('.slideBox').width();
  var index = 1;

  $('.sale .gjw-myBtn').on('click', function() {
    var $ul = $(this).parent().prev('ul');
    if ($(this).hasClass('slider-ctrl-next')) {
      index++;
      aniMove($ul, 2, scroWidth);
    } else if ($(this).hasClass('slider-ctrl-prev')) {
      index--;
      aniMove($ul, 2, scroWidth);
    }

  })

  //左右按钮点击图片切换事件
  function aniMove($ul, num, scroWidth) {
    $ul.animate({ 'left': -index * scroWidth }, 300, function() {
      if (index >= (num + 1)) {
        index = 1;
        $ul.css('left', -scroWidth);
      } else if (index <= 0) {
        index = num;
        $ul.css({ 'left': -num * scroWidth });
      }
    });
  }

})();

//一楼轮播图事件
;
(function() {
  var width = $('.tabBox .carousel').width();
  $('.tabPanel').myCarousel({
      imgBox: '.carousel .imgs',
      points: '.tabBox .point span',
      pointBox: '.tabBox .pointBox',
      width: width,
    })
    ////获取元素
    //var $floor = $('.floor');
    //var width =   $('.tabBox .carousel').width();
    //var $imgBox = $floor.find('.carousel .imgs');
    //var $points = $floor.find('.tabBox .point span');
    //var index = 1;
    //var timer = null;
    //
    //$('.tabBox .pointBox').on({
    //    'mouseover':function () {
    //    clearInterval(timer);
    //    },
    //    'mouseout': function () {
    //        timer = setInterval(function () {
    //            index++;
    //            aniMove($imgBox,3,width);
    //            setPoint();
    //        },1000)
    //    }
    //
    //})
    //$('.tabBox .gjw-myBtn').on('click', function () {
    //    if($(this).hasClass('slider-ctrl-next')){
    //        index++;
    //        aniMove($imgBox,3,width);
    //        setPoint();
    //    }else if($(this).hasClass('slider-ctrl-prev')){
    //        index--;
    //        aniMove($imgBox,3,width);
    //        setPoint();
    //    }
    //})
    //$points.each(function (i,ele) {
    //   $(this).on('mouseover', function () {
    //       index = i+1;
    //       aniMove($imgBox,3,width);
    //       setPoint();
    //   })
    //})
    //
    ////小圆点切换事件
    //function setPoint(){
    //    $points.removeClass('now');
    //    var pointIndex = index;
    //    if(pointIndex >= 4){
    //        pointIndex = 1;
    //    }else if(pointIndex <= 0){
    //        pointIndex = 3;
    //    }
    //
    //    $points.eq(pointIndex-1).addClass('now');
    //
    //}
    ////左右按钮点击图片切换事件
    //function aniMove($ul,num,scroWidth){
    //    $ul.animate({'left':-index*scroWidth},300,function(){
    //        if(index >= (num+1)){
    //            index = 1;
    //            $ul.css('left',-scroWidth);
    //        }else if(index <= 0){
    //            index = num;
    //            $ul.css({'left':-num*scroWidth});
    //        }
    //    });
    //}
})();
//楼层的tab栏切换
;
(function() {
  $('.floor').gjwTab({
    titCell: '.tabTitCell',
    tabCell: '.tabBox ul',
    active: 'active'
  });
})();
//楼梯导航事件
;
(function() {
  var $floorNav = $('#floorNav');
  var $cards = $floorNav.find('.card'); //7张卡片
  var $floor = $('.gj-mainContent .floor'); //6个楼层
  var len = $floor.length;
  $(window).bind('scroll resize', function() {
    showNav();
    cardTurn();
  });
  //当屏幕滚动显示楼层卡
  function showNav() {
    var iTop = document.documentElement.scrollTop || document.body.scrollTop;
    iTop > 600 ? $floorNav.fadeIn() : $floorNav.fadeOut();

  }
  //获取每个楼层卡对应的楼层高度
  function getPos($ele) {
    var href = $ele.attr('href');
    //console.log(href);
    var pos = href.indexOf('#');
    //console.log(pos);
    var hash = href.substring(pos);
    //console.log($(hash));
    var iPos = $(hash).offset().top; //计算每个楼层对应的top
    //console.log(typeof iPos);
    return iPos;
  }
  //楼层卡片的3d旋转
  function cardTurn() {
    var iTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = 0; i < len; i++) {
      var iNext = i + 1;
      if (iNext >= len) {
        iNext = len - 1;
      }
      //获取当前的高度和下一楼层高度，当高度满足预设进行相应的动画
      var iNowFloorTop = getPos($cards.eq(i));
      var iNextFloorTop = getPos($cards.eq(iNext));
      if (i != len - 1 && iTop >= iNowFloorTop - 300 && iTop < iNextFloorTop) {
        $cards.removeClass('active');
        $cards.eq(i).addClass('active');
        //console.log(11);
      } else if (i == len - 1 && iTop >= iNowFloorTop - 300) {
        $cards.removeClass('active');
        $cards.eq(i).addClass('active');
      }
    }
  }
  //卡片的点击事件
  $cards.on('click', function(ev) {
      ev.preventDefault(); //阻止点击默认的跳转事件
      var iPos = getPos($(this));
      //console.log(iPos);
      $('html,body').stop().animate({ scrollTop: iPos - 70 });

    })
    //返回顶部按钮的点击事件
  $('#goTop').on('click', function(ev) {
    ev.preventDefault()
    $('html,body').stop().animate({ scrollTop: 0 });

  });
})();
//购物车下拉列表
;
(function() {
  var $cart = $('.gj-search .cart ');
  var timer = null;
  $cart.hover(
    function() {
      clearTimeout(timer);
      $(this).find('.cartBox').css('background', '#fff');
      $(this).find('#cart_detaliList').show()
    },
    function() {
      var that = this;
      timer = setTimeout(function() {
        $(that).find('#cart_detaliList').hide();
        $(that).find('.cartBox').css('background', '#f9f9f9');

      }, 500)
    }
  )
})();;
(function() {})();
