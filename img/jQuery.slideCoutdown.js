(function($){
    $.fn.timer = function (opts) {
        return $(this).each(function () {
                if(typeof parseInt($(this).attr('data-time'))!='number') return;
                
                function checkTime(n) {
                    if (n < 10) {
                        return '0' + n;
                    } else {
                        return '' + n;
                    }
                }
                $(this).html('<div class="dayContainer"><div class="dayBox box">\
                                <span class="days t1"></span>\
                                <span class="t2"></span>\
                              </div></div>\
                              <div class="cnDay">天</div>\
                              <div><div class="hoursBox box">\
                                <span class="hours t1"></span>\
                                <span class="t2"></span>\
                              </div></div>\
                              <div>时</div>\
                              <div><div class="minBox  box">\
                                <span class="min t1"></span>\
                                <span class="t2"></span>\
                              </div></div>\
                              <div>分</div>\
                              <div><div class="secondBox box">\
                                <span class="second t1"></span>\
                                <span class="t2"></span>\
                              </div></div>\
                              <div>秒</div>');
                if(opts.day == false){
                   $(this).find('.dayContainer').css('display','none');
                   $(this).find('.cnDay').css('display','none');
                }
                var iHeight = parseInt(($(this).find('.minBox')[0].offsetHeight)/2);
                var reg = /MSIE 6|MSIE 7|MSIE 8|MSIE 9/;
                var isIe6789 = reg.test(window.navigator.userAgent);
                
                var $hours = $(this).find('.hours');
                var $min = $(this).find('.min');
                var $second = $(this).find('.second');
                function showTime(_this, iTimer) {
                    var day = parseInt(iTimer / 86400);
                    var hour = parseInt(iTimer % 86400 / 3600);
                    var min = parseInt(iTimer % 86400 % 3600 / 60);
                    var second = parseInt(iTimer % 86400 % 3600 % 60);
                    var $day = $(_this).find('.days');
                    changeTime($day,day);
                    var $hours = $(_this).find('.hours');
                    changeTime($hours,hour);
                   
                    var $min = $(_this).find('.min');
                    changeTime($min,min);
                    
                    var $second = $(_this).find('.second');
                    changeTime($second,second);
                }//end showtime
                function changeTime(obj,time){
                    if(obj.text()!=checkTime(time)){
                        obj.text(checkTime(time));
                        var $papa = obj.closest('div');
                        if(!isIe6789){
                            $papa.addClass('cd_animate').css('top','0px'); 
                        }else{
                            
                            $papa.stop().animate({top:0},250);
                       }
                       
                        setTimeout(function(){
                            obj.next().text(checkTime(time));
                            $papa.stop().removeClass('cd_animate').css('top',-iHeight+'px');
                        },300);
                    }
                }//end changetTime 
                var iTimer = parseInt($(this).attr('data-time'));

               
                var _this = this;
                this.tm = setInterval(function () {
                        iTimer--;
                        showTime(_this, iTimer);
                        if (iTimer <= 0) {
                            clearInterval(_this.tm);
                            (typeof opts.fnSucc == 'function') && opts.fnSucc.call(_this);
                        }
                }, 1000); //end tm
        })//end each
    }; // end plugin;
})(jQuery)


/*
样式参考
.cd{overflow:hidden; height:24px; border: 1px solid #ccc; width: 600px; z-index: 9;}
.cd div{ float:left; position: relative;width:20px;height:24px;line-height: 24px;overflow: hidden; }
.cd div .box{ position: absolute; left: 0 ; top: 0; z-index: 2;height:48px; }
*/