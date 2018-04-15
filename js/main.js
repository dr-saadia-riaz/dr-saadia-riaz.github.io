
$(document).ready(function(){
	"use strict";

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;


	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

  //-------- Active Sticky Js ----------//
     $(".default-header").sticky({topSpacing:0});


  //------- Active Nice Select --------//
     $('select').niceSelect();


   // -------   Active Mobile Menu-----//

  $(".menu-bar").on('click', function(e){
      e.preventDefault();
      $("nav").toggleClass('hide');
      $("span", this).toggleClass("lnr-menu lnr-cross");
      $(".main-menu").addClass('mobile-menu');
  });


  $('.nav-item a:first').tab('show');

  // Select all links with hashes
  $('.main-menubar a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top-68
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });



    //  Counter Js

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });



      // -------   Mail Send ajax

         // $(document).ready(function() {
         //    var form = $('#myForm'); // contact form
         //    var submit = $('.submit-btn'); // submit button
         //    var alert = $('.alert-msg'); // alert div for show alert message
				 //
         //    // form submit event
         //    form.on('submit', function(e) {
         //        // e.preventDefault(); // prevent default form submit
				 //
         //        // $.ajax({
         //        //     url: 'mail.php', // form action url
         //        //     type: 'POST', // form submit method get/post
         //        //     dataType: 'html', // request type html/json/xml
         //        //     data: form.serialize(), // serialize form data
         //        //     beforeSend: function() {
         //        //         alert.fadeOut();
         //        //         submit.html('Sending....'); // change submit button text
         //        //     },
         //        //     success: function(data) {
         //        //         alert.html(data).fadeIn(); // fade in response data
         //        //         form.trigger('reset'); // reset form
         //        //         submit.attr("style", "display: none !important");; // reset submit button text
         //        //     },
         //        //     error: function(e) {
         //        //         console.log(e)
         //        //     }
         //        });
         //    });
  });

	function handleBlogs(data){
		var blogs = data.feed.entry;

		var blog;
		for(var i=0; i<blogs.length; i++){
			var content = blogs[i].content.$t;
			var imageLink = getvalueFromHtml(content, "href");
			var blogDesc = getDescFromHtml(content, "width=\"320\" /></a></div><br />");
			var blogLink = blogs[i].link[4].href;
			console.log(blogLink);
			blog = {
				title: blogs[i].title.$t,
				datePublished: blogs[i].published.$t.substr(0, blogs[i].published.$t.indexOf('T')),
				image: imageLink,
				link: blogLink,
				desc: blogDesc
			};

			$("#blog"+(i+1)).find(".blogLink").attr("href",blog.link);
			$(".blog"+(i+1)+"Image").attr("src",blog.image);
			$("#blog"+(i+1)).find(".blogLink").html(blog.title);
			$("#blog"+(i+1)).find(".blogDesc").html(blog.desc);
			$("#blog"+(i+1)+"date").html(blog.datePublished);
		}

		$(".coverLoad").css({
			display:"none"
		});
	}

function getvalueFromHtml(html, identifier){
	var image = html.substr(html.indexOf(identifier), html.length);
	var img1 = image.substr(image.indexOf('"')+1, image.length);
	img1 = img1.substr(0, img1.indexOf('"'));
	return img1;
}

function getDescFromHtml(html, identifier){
	var image = html.substr(html.indexOf(identifier)+identifier.length, html.length);
	var img1 = image;
	img1 = img1.substr(0, img1.indexOf("\u003C\/div\u003E\u003Cdiv\u003E"));
	return img1;
}
