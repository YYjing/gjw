//友情链接轮换
;(function () {
    var $box = $('.friendLinkBox');
    setInterval(function () {//top变化定时器
        var height = -($box.children('li').length-1)*25;
        var top = parseInt($box.css('top'))
        if( top == height){//需要配合HTML重复第一个li元素无缝衔接
            $box.css('top',0);
        }
        $box.animate({'top':'-=25px'},1000)
    },1500)
})();