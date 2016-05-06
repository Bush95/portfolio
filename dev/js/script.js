/*jslint browser: true */
/*global $, jQuery, alert*/
(function () {
    'use strict';

    var addListeners = function () {
        var $body = $('body');

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 300) {
                $('.to-top').fadeIn(300);
            } else {
                $('.to-top').fadeOut(300);
            }
        });
        $('.hamburger').on('click', function () {
            $body.toggleClass('nav-open');
        });
        $('.to-top').on('click', function () {
            $body.removeClass('nav-open')
            $('html, body').animate({
                scrollTop: 0
            }, 300);
        });
        $('.page-nav').on('click', 'a', function (e) {
            e.preventDefault();
            $body.removeClass('nav-open');
            var el = this;
            
            var scrollToHref = function (element, time) {
                var destination = $('.' + $(element).attr('href').slice(1)).offset().top;
                $('html, body').animate({
                    scrollTop: destination
                }, time); 
            };
            
            window.setTimeout(function () {
                scrollToHref(el, 500);
            },300);
        });
    };

    var secureEmail = function (domain, reversedStr) {
        var reversedStr = '59azulakrtoip';
        var beforeAt = reversedStr.split('').reverse().join('');
        var readyEmail = 'mailto:' + beforeAt + '@' + domain;
        $('#contact-email').attr('href', readyEmail);
    };

    addListeners();
    secureEmail('gmail.com', '59azulakrtoip');

}());