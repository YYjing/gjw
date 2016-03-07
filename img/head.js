
var user_identity = 0;
//点赞
function PostPraise(type, docid, pre) {
    $.ajax({
        url: "http://faxian.gjw.com/Ajax/Praise/CustomerPraise.htm?act=praise&type=" + type + "&documetid=" + docid + "&uid=" + user_identity + "",
        type: "GET",
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'getPraise',
        success: function (data) {
            if (data.state == 1) {
                $("#" + pre + docid).html(data.value);
                alert("点赞成功");
            } else {
                alert("已点赞");
            }
        }
    })

}

function domReady(fn) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn, false)
    } else {
        document.attachEvent('readystatechange', function () {
            if (document.readyState == 'complete') {
                fn && fn()
            }
        })
    }
}

function newjointocart1(id) {
    var rtime = new Date().getTime();
    var url = "http://www.gjw.com/Ajax/Order/OrderAdd-act-NewAddPro-ID-" + id + "-Quantity-1.htm?time=" + rtime;
    document.write(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'getCarts',
        success: function (data) {
            alert(1)
            if (data.Success == "True") {
                location.href = '<%=Common.Constant.SiteUrl %>/purchase/ShoppingCart.htm';
                return false;
            } else {
                alert(data.Message);
                return false;
            }
        },
        error: function () {
            alert(12);
        }
    })

}

$(function () {

    /*---旧的head.js s---*/

    /*忽略ie错误*/
    function killerrors() { return true; }

    window.onerror = killerrors;

    //加载会员信息
    $.ajax(
            { url: 'http://www.gjw.com/ajax/user/GetCurUserInfo.aspx',
                type: 'GET',
                async: false,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'getUsrId',
                success: function (jsonData) {
                    var curUsrId = jsonData.usrId;
                    user_identity = curUsrId;
                    if (curUsrId > 0) {
                        var usrName = jsonData.userName;
                        var sHtml = '<div class="vip">' +
                            '<a href="http://www.gjw.com/user/" class="username">' + usrName + '</a>' +
                            '<a class="quit" href="http://www.gjw.com/login/Exit.htm" target="_self" rel="nofollow">退出</a>' +
                            '</div>';
                        $('.login').parent().html(sHtml);
                    }
                }
            }
        );

    var miniMenu = function () {
        /*购物列表*/
        $(".miniMenu").find(".m1").hover(
			function () {
			    $(this).addClass("on");
			    $(this).find(".mini-cart").show();
			    var dd = new Date();
			    $("#head_cart").load("/ajax/head/shoppingcart.htm?act=getitems&d=" + escape(dd));
			},
			function () {
			    $(this).removeClass("on");
			    $(this).find(".mini-cart").hide();
			}
		)
        /*用户中心*/
        $(".miniMenu").find(".m3").hover(
			function () {
			    $(this).addClass("cur");
			    $(this).find(".miniMenu-child").show();
			},
			function () {
			    $(this).removeClass("cur");
			    $(this).find(".miniMenu-child").hide();
			}
		)
    } ();

    //搜索

    $("#fixSearchBtn").click(function () {

        window.location = 'http://www.gjw.com/product/search_jump.htm?key=' + encodeURIComponent($("#fixSch").val());
    });

    $("#btnsch").click(function () {

        window.location = 'http://www.gjw.com/product/search_jump.htm?key=' + encodeURIComponent($("#sch").val());
    });

    //读取购物车数量
    var dd = new Date();
    $("#head_cart_no").load("/ajax/head/shoppingcart.htm?act=getcount&d=" + escape(dd));

    /*------购物车下拉菜单s------*/
    $('#myCart').hover(function () {
        var time = new Date().getTime();
        var $headCart = $("#head_cart");
        $headCart.load("/ajax/head/shoppingcart1.htm?act=getitems&d=" + time, null, function () {
            var proCount = $('#cartProCount').html();
            proCount = proCount ? proCount : 0;
            $('#head_cart_no').html(proCount);
        });
    });

    function hoverDrop() {
        var $drop = $('.dropBox.topBar_cart ');
        var timer = null;
        $drop.hover(
		 	function () {
		 	    clearTimeout(timer);
		 	    $(this).find('.topBar_cartBtn').css('background', '#fff');
		 	    $(this).find('.dropBox_hideList').show()
		 	},
		 	function () {
		 	    var _this = this;
		 	    timer = setTimeout(function () {
		 	        $(_this).find('.dropBox_hideList').hide();
		 	        $(_this).find('.topBar_cartBtn').css('background', '#f9f9f9');

		 	    }, 500)
		 	}
	 	)
    }
    hoverDrop();
    /*------购物车下拉菜单e------*/




    function formatItem(row) {
        //console.log(row);
        return " <p style=\"white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\">" + row[0] + " </p>" + " <span>" + row[1] + "个结果</span>" +
                "<input type='hidden' value='" + row[2] + "' />" +
                "<input type='hidden' value='" + row[3] + "' />";
    }

    function formatResult(row) {
        console.log(row);
        return row[0].replace(/(<.+?>)/gi, '');
    }

    function selectItem(li) {
        makeSearchUrl(li);
    }

    var makeSearchUrl = function (o) {
        var name = o.selectValue;
        var type = o.extra[1];
        var id = o.extra[2];
        var url = "";
        if (type == 1) {
            url = "http://www.gjw.com/product/item-id-" + id + ".htm";
            window.open(url, '_self');
        } else {

            var keys = encodeURIComponent(name);
            url = "http://www.gjw.com/product/search.htm?key=" + keys;
            window.open(url, '_self');
        }
        return true;
    };
    require(['http://www.gjw.com/v6/js/jquery.autocomplete.js'], function () {
        $("#sch,#fixSch").autocomplete("/ajax/SearchKey.aspx" + $("#sch").val(), {
            max: 10,
            delay: 10,
            matchSubset: 1,
            matchContains: 1,
            cacheLength: 1,
            onItemSelect: selectItem,
            formatItem: formatItem,
            formatResult: formatResult
        });
    });
    /*---搜索提示e----*/
    $("#fixSch").change(function () {
        $("#sch").val($("#fixSch").val());
    });
});

/*----------------------------------------头部组件-----s-------------------------------------------*/

$(function () {
    /*----顶部通栏s-----*/
    function dropList() {
        var isIe6 = window.navigator.userAgent.toLowerCase().indexOf('msie 6') != -1;
        if (!isIe6) return;
        $('.fixedTopBar_dropList').hover(
					function () {
					    $(this).find('.dropBox_hideList').show();
					},
					function () {
					    $(this).find('.dropBox_hideList').hide();
					}
				)
    }
    dropList();
    //.focus_us:hover .hoverQrCode
    function qrCodeShow() {
        $focus_us = $('.focus_us');
        $qr_code = $('.hoverQrCode');
        var timer = null;
        $focus_us.hover(
            function () {
                clearTimeout(timer);
                $qr_code.show();
            },
            function () {
                timer = setTimeout(function () {
                    $qr_code.hide();
                }, 500)
            }
        )
    }
    qrCodeShow()
    /*----顶部通栏e-----*/
    /*悬浮搜索条s*///组件
    function showSchBox() {

        var isIe6 = window.navigator.userAgent.toLowerCase().indexOf('msie 6') != -1;

        var bUrl = window.location.href.toLowerCase().indexOf('\/item') != -1;

        if (bUrl) return;
        var $fixSch = $('.fixedSch_box');
        isIe6 && $fixSch.hide();
        if (!$fixSch) { return };
        $(window).bind('scroll', function () {
            var sTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (sTop > 500) {
                $fixSch.css({ top: '0px' })

            } else {
                $fixSch.css({ top: '-100px' })

            }
        })

    }
    showSchBox();

    /*悬浮搜索条e*/

    /*----导航条菜单s--组件---*/
    function getByClass(oPapa, sClass) {
        if (oPapa.getElementsByClassName) {
            return oPapa.getElementsByClassName(sClass);
        }
        var ele = oPapa.getElementsByTagName('*');
        var regExp = new RegExp('\\b' + sClass + '\\b');
        var arr = [];
        for (var i = 0; i < ele.length; i++) {
            if (regExp.test(ele[i].className)) {
                arr.push(ele[i]);
            }
        }
        return arr;
    }


    function tabNav(id) {
        function tabNavStyle() {
            var $navTit = $('.navBar_navTab');
            if (!$navTit) return;

            var $aItem = $('.navBar_cateItem');

            $navTit.bind('mouseleave', function () {

                $aItem.removeClass('hover');
            })
            $aItem.bind('mouseenter', function () {

                $aItem.removeClass('hover');
                $(this).addClass('hover');
            })

        }
        tabNavStyle();
        var oBox = document.getElementById(id);
        if (!oBox) return;
        var aItemTit = getByClass(oBox, 'itemTab');
        var aTabBox = getByClass(oBox, 'navBar_subNav');
        var len = aItemTit.length;

        function allHide() {
            for (var i = 0; i < len; i++) {
                aTabBox[i].style.display = 'none';

            }
        }
        for (var i = 0; i < len; i++) {
            (function (index) {
                aItemTit[index].onmouseover = function () {
                    allHide();
                    aTabBox[index].style.display = 'block';
                }
            })(i)
        }
        $(oBox).bind('mouseleave', function () {
            allHide();
        })
        $('.noSubNav').mouseenter(function () {
            allHide();
        })
        if ($('.navBar_navTab').hasClass('hide')) {
            $(".v6_navBar_cate.dropBox").hover(
                function () {
                    $('.navBar_navTab').show();
                },
                function () {
                    $('.navBar_navTab').hide();
                }
            )
        }

    }
    tabNav('navBar_cate');
    /*----导航条菜单e-----*/
    /*---顶部公告广告s---*/
    function adToggle() {
        var $focusPic = $('.focusPic');
        if (!$focusPic) return; //没有广告就不执行下面的;
        var $toggleBtn = $focusPic.find('.focusPic_close');
        var $sndImg = $focusPic.find('.secondImg');
        var adTimer = null;
        var bDown = true;
        if ($focusPic.height() == 80) {
            bDown = false;
            clearTimeout(adTimer);
        }
        $toggleBtn.bind('click', function () {
            if (bDown) {
                imgSlideUp();

            } else {
                imgSlideDown();

            }
        })
        function imgSlideUp() {
            $focusPic.stop().animate({ height: 80 + 'px' }, function () {
                if ($sndImg.length != 0) {
                    $sndImg.stop().animate({ bottom: 0 }, 'fast');
                }

                $toggleBtn.html('展开');
                bDown = false;
            });
        }
        function imgSlideDown() {
            if ($sndImg.length == 0) {
                $focusPic.stop().animate({ height: 270 + 'px' }, 'fast');
            } else {
                $sndImg.stop().animate({ bottom: -80 + 'px' }, 'fast', function () {
                    $focusPic.stop().animate({ height: 270 + 'px' }, 'fast');
                })
            }
            $toggleBtn.html('收起');
            bDown = true;
        }
        adTimer = setTimeout(function () {
            imgSlideUp();
        }, 2000);
        $focusPic.hover(
					function () {
					    clearTimeout(adTimer);
					},
					function () {
					    adTimer = setTimeout(function () {
					        imgSlideUp();
					    }, 2000);
					}
				)
    }
    adToggle();

    function noticeBar() {
        if (!$('.noticeBar_close')) return;
        $('.noticeBar_close').bind('click', function () {
            $('.noticeBar').stop().hide('fast');
        });
    }
    noticeBar();
    /*---顶部公告广告e---*/

})


	/*------------------------------------------头部组件----e--------------------------------------------*/