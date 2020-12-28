/*
 * jQuery Plugin: dynamic & easy moving menu. for your web site.
 * Version 1.0.0
 *
 * Copyright (c) 2013 M&Co.Ltd. (http://m-and.co/)
 * Licensed jointly under the GPL and MIT licenses,
 *
 */

(function($) {

    $.fn.Wiper = function(method) {

        var window_w = 0;
        var window_h = 0;
        var menu_num = 0;
        var menu_width = 0;
        var is_inner = false;
				var ua = '';

        var methods = {

            init : function(options) {
                var s = this;

                s.o = $.extend({}, this.Wiper.defaults, options);

								ua = window.navigator.userAgent.toLowerCase();

                if (s.o.binder != $(window)) {
                    is_inner = true;

                    s.width(s.parent().width());
                    s.height(s.parent().height());
                    var wrap = $('<section id="wiper_wrap"></section>');
                    wrap.css("overflow", "hidden");
                    s.wrapAll(wrap);
                }

                window_w = s.o.binder.width();
                window_h = s.o.binder.height();

                $(window).bind("resize", function() {
                    window_w = s.o.binder.width();
                    window_h = s.o.binder.height();

                    $(s).children("li").each(function() {
                        if ($(this).hasClass("wiper_open")) {
                            helpers.adjust_contents($(this), s.o);
                        }

                        if (window_w < window_h) {
                            $(this).children("h2").width(window_h);
                        } else {
                            $(this).children("h2").width(window_w);
                        }
                    });
                    s.width(window_w);
                    s.height(window_h);
                });

                $(window).resize();

                this.each(function() {
                    var $element = $(this), // reference to the jQuery version of the current DOM element
                    element = this;      // reference to the actual DOM element
                    // code goes here
                    menu_num = $(this).children("li").length;
                    var li_index = 0;
                    $(this).children("li").each(function() {
                        var lh = parseInt($(this).children("h2").css("lineHeight"));
                        var li = $(this);
                        li.attr("data-index", li_index)
                        .css("left", (li_index*lh)+"px");

                        $(this).children("h2").each(function() {
                            $(this).css("cursor", "pointer");
                            if (s.o.menuColors[li_index] != undefined && s.o.menuColors[li_index] != false) {
                                $(this).css("backgroundColor", s.o.menuColors[li_index]);
                            }
                        });

                        if (window_w < window_h) {
                            var padding_right = parseInt($(this).children("h2").css("paddingRight"));
                            $(this).children("h2").width(window_h);
                            li.height(window_h + padding_right);
                        } else {
                            li.height(window_w);
                        }
                        menu_width = $(this).children("h2").height();
                        $(this).children("h2").click(function() {
                            helpers.menu_slide(li, menu_num, s.o);
                        });
                        li_index++;
                    });
                });

                if (s.o.offset != -1) {
                    setTimeout(function() {
                        s.children("li").eq(s.o.offset).find("h2").click();
                    }, s.o.offsetDelay);
                }

                return this;
            },

            // a public method. for demonstration purposes only - remove it!
            public_method: function() {
                // code goes here
            }
        }

        var helpers = {
            menu_slide: function(li, menu_num, options) {
                // code goes here
                var s = this;
                var cur_data_index = Number(li.attr("data-index"));

                //if (li.offset().left < (window_w / 2)) {
                if (!li.hasClass("wiper_open")) {
                    //move right
                    var menu_top = -455;
                    var menu_rotate = 0;

                    var next_num = li.nextAll("li").length;
                    if (li.attr("data-index") != 0) {
                        var menu_translateX = options.binder.width() + cur_data_index * 15 - 250;
                        var move_width = menu_width * (next_num+1);
												if (ua.indexOf("chrome") != -1){
													li.css({
															'-webkit-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
															'-webkit-transform-origin':'550px 225px',
													});
												} else if (ua.indexOf("safari") != -1){
													li.css({
															'-webkit-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
															'-webkit-transform-origin':'550px 225px',
													});
												} else if (ua.indexOf("firefox") != -1){
													li.css({
															'-moz-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'-moz-transition':'-moz-transform '+options.duration+'ms ' + options.easing,
															'-moz-transform-origin':'550px 225px',
													});
												} else {
													li.css({
															'transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'transition':'transform '+options.duration+'ms ' + options.easing,
															'transform-origin':'550px 225px',
													});
												}
                        li.addClass("wiper_open");
                    }
                    li.nextAll("li").each(function() {
                        var menu_translateX = options.binder.width() + (Number($(this).attr("data-index"))) * 15 - 250;
                        var move_width = menu_width * (menu_num - (Number($(this).attr("data-index"))));
												if (ua.indexOf("chrome") != -1){
													$(this).css({
															'-webkit-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
															'-webkit-transform-origin':'550px 225px',
													});
												} else if (ua.indexOf("safari") != -1){
													$(this).css({
															'-webkit-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
															'-webkit-transform-origin':'550px 225px',
													});
												} else if (ua.indexOf("firefox") != -1){
													$(this).css({
															'-moz-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'-moz-transition':'-moz-transform '+options.duration+'ms ' + options.easing,
															'-moz-transform-origin':'550px 225px',
													});
												} else {
													$(this).css({
															'transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
															'transition':'transform '+options.duration+'ms ' + options.easing,
															'transform-origin':'550px 225px',
													});
												}
                        $(this).addClass("wiper_open");
                    });
                } else {
                    //move left

                    var prev_num = li.prevAll("li").length;

										if (ua.indexOf("chrome") != -1){
											li.css({
													'-webkit-transform':'translate3d(0px,0px,0) rotate(0deg)',
													'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
													'-webkit-transform-origin':'550px 225px',
											});
										} else if (ua.indexOf("safari") != -1){
											li.css({
													'-webkit-transform':'translate3d(0px,0px,0) rotate(0deg)',
													'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
													'-webkit-transform-origin':'550px 225px',
											});
										} else if (ua.indexOf("firefox") != -1){
											li.css({
													'-moz-transform':'translate3d(0px,0px,0) rotate(0deg)',
													'-moz-transition':'-moz-transform '+options.duration+'ms ' + options.easing,
													'-moz-transform-origin':'550px 225px',
											});
										} else {
											li.css({
													'transform':'translate3d(0px,0px,0) rotate(0deg)',
													'transition':'transform '+options.duration+'ms ' + options.easing,
													'transform-origin':'550px 225px',
											});
										}
                    li.removeClass("wiper_open");

                    li.prevAll("li").each(function() {
                        var menu_translateX = 830 + (Number($(this).attr("data-index"))) * 15;
                        var move_width = menu_width * (Number($(this).attr("data-index")));
												if (ua.indexOf("chrome") != -1){
													$(this).css({
															'-webkit-transform':'translate3d(0px,0px,0) rotate(0deg)',
															'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
															'-webkit-transform-origin':'550px 225px',
													});
												} else if (ua.indexOf("safari") != -1){
													$(this).css({
															'-webkit-transform':'translate3d(0px,0px,0) rotate(0deg)',
															'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
															'-webkit-transform-origin':'550px 225px',
													});
												} else if (ua.indexOf("firefox") != -1){
													$(this).css({
															'-moz-transform':'translate3d(0px,0px,0) rotate(0deg)',
															'-moz-transition':'-moz-transform '+options.duration+'ms ' + options.easing,
															'-moz-transform-origin':'550px 225px',
													});
												} else {
													$(this).css({
															'transform':'translate3d(0px,0px,0) rotate(0deg)',
															'transition':'-moz-transform '+options.duration+'ms ' + options.easing,
															'transform-origin':'550px 225px',
													});
												}
                        $(this).removeClass("wiper_open");
                    });
                }
            },
            adjust_contents: function(li, options) {
                //move right
                var menu_top = -455;
                var li_index = li.attr("data-index");

                var menu_translateX = options.binder.width() + li_index * 15 - 250;
								if (ua.indexOf("chrome") != -1){
									li.css({
											'-webkit-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
											'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
											'-webkit-transform-origin':'550px 225px',
									});
								} else if (ua.indexOf("safari") != -1){
									li.css({
											'-webkit-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
											'-webkit-transition':'-webkit-transform '+options.duration+'ms ' + options.easing,
											'-webkit-transform-origin':'550px 225px',
									});
								} else if (ua.indexOf("firefox") != -1){
									li.css({
											'-moz-transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
											'-moz-transition':'-moz-transform '+options.duration+'ms ' + options.easing,
											'-moz-transform-origin':'550px 225px',
									});
								} else {
									li.css({
											'transform':'translate3d('+menu_translateX+'px,'+menu_top+'px,0) rotate(-45deg)',
											'transition':'transform '+options.duration+'ms ' + options.easing,
											'transform-origin':'550px 225px',
									});
								}
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in Wiper plugin!');
        }
    }

    $.fn.Wiper.defaults = {
        easing: 'cubic-bezier(0,0,0.25,1)',
        duration: 1300,
        offset: 1,
        offsetDelay: 0,
        binder: $(window),
        menuColors: [ '#666699', '#660066', '#20aeb2', '#cc99cc', '#339999', '#228b22' ],
    }

    $.fn.Wiper.settings = {}

})(jQuery);
/* 代码整理：懒人之家 www.lanrenzhijia.com */