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
            }, 300);
        });
        $('#contact-form').on('submit', validateForm);
    };

    var validateEmail = function (email) {
        var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return re.test(email);
    }

    var validateForm = function (e) {
        var input = $(this).serialize(); //.replace('/+/g','&20').replace('/@/', '%40');
        e.preventDefault();
            $.ajax({
            type: 'POST',
            url: $('#contact-form').attr('action'),
            data: input,
            success: function(result) {
                alert('wysłano');
                console.log(result);
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        });
    };

    var secureEmail = function (domain, reversedStr) {
        var beforeAt = reversedStr.split('').reverse().join('');
        var readyEmail = beforeAt + '@' + domain;
        return readyEmail;
    };

    addListeners();
    }());