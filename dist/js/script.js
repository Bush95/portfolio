!function(){"use strict";var t=function(){var t=$("body");$(".hamburger").on("click",function(){t.toggleClass("nav-open")}),$(".page-nav").on("click","a",function(n){n.preventDefault(),t.removeClass("nav-open");var o=this,a=function(t,n){var o=$("."+$(t).attr("href").slice(1)).offset().top;$("html, body").animate({scrollTop:o},n)};window.setTimeout(function(){a(o,500)},300)}),$("#contact-form").on("submit",n)},n=function(t){var n=$(this).serialize();t.preventDefault(),$.ajax({type:"POST",url:$("#contact-form").attr("action"),data:n,success:function(t){alert("wysłano"),console.log(t)},error:function(t,n,o){alert("POST failed.")}})};t()}();