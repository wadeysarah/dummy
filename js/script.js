  $(document).ready(function () {
    
    
    var _width, _height, _ratio = 1.7;
    var $greater_than_8_elements = true;
    var done = false;
    
    /**
     *
     * WORK EXPANDED PAGE
     */
    $('.subcat-title a').click(function(){
	var subcat = $(this).closest('div.subcat');
	var current = $('div.subcat.shown');
	
	current.children('.subcat-images').slideUp('slow',function(){
	    subcat.children('.subcat-images').slideDown('medium');
	    
	    current.removeClass('shown');
	    subcat.addClass('shown');
	});
	
	return false;
    });
    
    /**
     *
     * VIEW PAGE
     */
    $('a#show_hide').click(function(){
      
      //alert("show me the viewer");
      
      if($(this).text() === 'THUMBNAIL VIEW'){
          //alert('inverse');
          $('#fullview').removeClass('viewport').addClass('viewport_expanded');
          $(this).text('DETAIL VIEW');
          $('#fullview').css('visibility','visible').hide().fadeIn('slow');
          $('.viewer, .thumb-details').css({"visibility":"hidden"});
          $('.viewer, .thumb-details').css({"display":"none"});
          
          //removed fixed property from footer
          $('.thumb-slider').removeClass( 'give_thumb_properties' );
          
          //inverse fade
          $('.slider2 .image img').css({"opacity":"1"});
          $('.slider2 .image.shown img').css({"opacity":".3"});

          //scroll stuff
          $('.scrollableArea').addClass( 'remove_makeMeScrollable' );
          $('.kinetic-active').removeClass( 'scrollWrapper' );
          $("#makeMeScrollable").smoothDivScroll({

            hotSpotScrolling: false,
            touchScrolling: false,
            manualContinuousScrolling: false,
            visibleHotSpotBackgrounds: "always",
            mousewheelScrolling: false            
          });          
          
          
      }
      else {
          $('#fullview').removeClass('viewport_expanded').addClass('viewport');
          $(this).text('THUMBNAIL VIEW');
          $('.viewer, .thumb-details').css('visibility','visible').hide().fadeIn('slow');

          //add fixed property from footer
          $('.thumb-slider').addClass( 'give_thumb_properties' );
          
          //inverse fade
          $('.slider2 .image img').css({"opacity":".3"});
          $('.slider2 .image.shown img').css({"opacity":"1"});
          
          //scroll stuff
          $('.scrollableArea').removeClass( 'remove_makeMeScrollable' );
          $('.kinetic-active').addClass( 'scrollWrapper' );
          $("#makeMeScrollable").smoothDivScroll({
            
            hotSpotScrolling: $greater_than_8_elements,
            touchScrolling: $greater_than_8_elements,
            manualContinuousScrolling: false,
            visibleHotSpotBackgrounds: "always",
            mousewheelScrolling: $greater_than_8_elements            
          });
          
	}
    });

    $('#fullview .image img').click(function(){      
     
        $('#fullview').removeClass('viewport_expanded').addClass('viewport');
        $('.viewer, .thumb-details').css('visibility','visible').fadeIn();
        //$('#fullview').slideDown();
        
        $('.slider2 .image img').css({"opacity":".3"});
        $('.slider2 .image.shown img').css({"opacity":"1"});
        
    });
    
       
    if($('body').hasClass('home')){
	
	$('ul#flasher').bind('preload', function(e, height){
	    var h = $(window).height() - 60;

	    $(this).css({
		'margin-top': (h / 2) - (height / 2)
	    });
	    
	    elem = $('ul#flasher li img').css('height', height);
            if(done === false){
                images = $('ul#flasher li img');
                $('ul#flasher').html('<li class="shown" ><div style="height:' + height + 'px;" ><img src="/image/loading.gif" style="margin-top:' + ((height / 2) - 8) + 'px" /></div></li>');
                preload(images, height);
                done = true;
            }
	});
	
	var setIntroImage = function(){
	    var imgs = $("#flasher li "),
	    wid = $(window).width() - 20,
	    hei = $(window).height() - 60;
	    
	    if((wid / 2.11) >= hei){
		$('ul#flasher').trigger('preload', hei);
	    } else {
		$('ul#flasher').trigger('preload', Math.round(wid / 2.11));		
	    }
	};
	
	setIntroImage();
	
	$(window).resize(setIntroImage);
    }
	
	
    var s = {
	slider : $('.slider'),
	base : this,

	slide : function(){
	    var $this = $(this);
	    var displayWidth = $('.wrapper').width();
	    var width  = $this.width();
	    
	    var time, currentPostion,
	    newPostion = width - displayWidth,
	    direction = $this.data('dir');
	    
	    $this.children('.image').fadeTo(300, 1);
	      
	    if(direction === 'left'){
		currentPostion = $this.css('left');
	    } else {
		currentPostion = $this.css('right');
	    }
	    
	    if(currentPostion !== 'auto'){
		currentPostion = Math.floor(currentPostion.replace('px', ''));
	    } else {
		currentPostion = 0;
	    }
	    
	    
	    distance = Math.abs(newPostion) - Math.abs(currentPostion);
	    time = Math.abs(distance) * 10;
	    
	    if(direction === 'left'){
		$this.animate({
		    'left' : '-' + newPostion
		}, time, 'linear');
	    } else {
		$this.animate({
		    'right' : '-' + newPostion
		}, time, 'linear');
	    }
	},
	
	init : function(){
	    this.slider.each(this.slide);
	    
	    this.slider.hover(function(){
		$(this).children('.image').fadeTo(300, .2);
		    
		$('.image').hover(function(){
		    $(this).fadeTo(200, 1);
		}, function(){
		    $(this).fadeTo(200, .2);
		});
		
	    }, this.slide);
	}

    };
    
    s.init();
        
        
    /**
     * View Page Slider Fixed for Height
     */
    
    
    stick_footer();
    $(window).resize(function(){
        stick_footer();
    });    
            

    /**
     * View Page Slider
     */
    var slider2 = $('.slider2');
    
    var mouseSlide = function(){
        slider2.each(function(){
            var $this    = $(this),
            displayWidth = $('.wrapper').width(),
            width	     = $this.width();
        });
    };
    
    mouseSlide();
    
    $(window).resize(mouseSlide);
   
    
    var viewer = $('.slider2 .image');


      $('.slider2 .image img').hover(function(){
      
      if($('a#show_hide').text() !== 'THUMBNAIL VIEW'){ //which means its on thumbnail view
        $(this).animate({
            'opacity' : '.3'
        }, 100);
      }
      else{
        $(this).animate({
            'opacity' : '1'
        }, 100);
      }

    }, function(){
      
      if($('a#show_hide').text() !== 'THUMBNAIL VIEW'){
        if($(this).closest('.image').hasClass('shown')){
            $(this).css({
               'opacity' : '.3'
            });
        } else {
            $(this).animate({
               'opacity' : '1'
            }, 100);
        }
      }
      else{
        if($(this).closest('.image').hasClass('shown')){
            $(this).css({
               'opacity' : '1'
            });
        } else {
            $(this).animate({
               'opacity' : '.3'
            }, 100);
        }
      }
        
    });
      
   
    var setDetailPageImageSize = function(ratio){
	var width = window.innerWidth;
	var height_detail = window.innerHeight - 225;
        
        //alert(window.innerHeight);

        if ((window.innerHeight) > 500 || ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) ){ // max and min ratio
          if((width / ratio) > height_detail){ //landscape mode
              $('#viewing .image').css('height', height_detail);
              $('#viewing .image img').css('height', height_detail);
          } else { //portrait mode
              $('#viewing .image').css('height', (width / ratio)); //the ratio
              $('#viewing .image img').css('height',  window.innerWidth / ratio);
          }
        }
        else{
          $('#body').css('height', 500);
        }
        
    };

    //THIS PRELOAD WAS FROM OTHER DUDE... DON"T THINK IT DOES ANYTHING
    function preload(images, height) {
	i = 0;
	len = images.length;
        img_src = new Array;
        
	$(images).each(function(key, val){
            img_src.push($(val).attr('src'));
	});

        $.preload({
            images: img_src,
            load: function(img){
              alert('testing preload');
                
                holder = $('ul#flasher');
                
                img = $('<img />', {
                    src: img,
                    height: height
                });
                
                if(i === 0){
                    holder.html('');
                    $('<li />', {
                        'class': 'shown',
                        html: img
                    }).appendTo(holder);
                } else {
                    $('<li />', {
                        html: img
                    }).appendTo(holder);
                }
                
                i++;
            },
            complete: function(){
                $('#flasher').flasher();
            }
        });
        
        return true;
    }
    
    var thumbnailNextHideShow = function(e){
        //INVERSE THUMBNAILS
        if($('a#show_hide').text() !== 'THUMBNAIL VIEW'){
            e.preventDefault();
            if($('.slider2 .image.shown').next().length > 0){
                $('.slider2 .image.shown img').stop(true).animate({
                    'opacity' : 1
                }, 'fast', function(){
                    $('.slider2 .image.shown').removeClass('shown').next('.image').addClass('shown');
                    $('.slider2 .image.shown img').stop(true).animate({
                        'opacity' : .3
                    }, 'fast', function(){
                        viewerDisplay();
                    });
                });
            }
            else{
            // similar behavior as clicking on a link
            window.location.href = $(".next-sub-cat a#next").attr("href");
            }
        }
        else{
            e.preventDefault();
            if($('.slider2 .image.shown').next().length > 0){
                $('.slider2 .image.shown img').stop(true).animate({
                    'opacity' : .3
                }, 'fast', function(){
                    $('.slider2 .image.shown').removeClass('shown').next('.image').addClass('shown');
                    $('.slider2 .image.shown img').stop(true).animate({
                        'opacity' : 1
                    }, 'fast', function(){
                        viewerDisplay();
                    });
                });
            }
            else{
            // similar behavior as clicking on a link
            window.location.href = $(".next-sub-cat a#next").attr("href");
            }               
        }      
    };
    
    var thumbnailPrevHideShow = function(e){
        //INVERSE THUMBNAILS
        if($('a#show_hide').text() !== 'THUMBNAIL VIEW'){
            e.preventDefault();
            if($('.slider2 .image.shown').prev().length > 0){
                $('.slider2 .image.shown img').stop(true).animate({
                    'opacity' : 1
                }, 'fast', function(){
                    $('.slider2 .image.shown').removeClass('shown').prev('.image').addClass('shown');
                    $('.slider2 .image.shown img').stop(true).animate({
                        'opacity' : .3
                    }, 'fast', function(){
                        viewerDisplay();
                    });
                });
            }
            else{
            // similar behavior as clicking on a link
            window.location.href = $(".next-sub-cat a#prev").attr("href");
            }
        }
        else{
            e.preventDefault();
            if($('.slider2 .image.shown').prev().length > 0){
                $('.slider2 .image.shown img').stop(true).animate({
                    'opacity' : .3
                }, 'fast', function(){
                    $('.slider2 .image.shown').removeClass('shown').prev('.image').addClass('shown');
                    $('.slider2 .image.shown img').stop(true).animate({
                        'opacity' : 1
                    }, 'fast', function(){
                        viewerDisplay();
                    });
                });
            }
            else{
            // similar behavior as clicking on a link
            window.location.href = $(".next-sub-cat a#prev").attr("href");
            }   
        }
    };
    
    
    var viewerDisplay = function(){
           
	if(viewer.length > 0){
	    var shown = viewer.closest('.shown');
	    var image = shown.data('value');
	    var image_id = shown.data('id');
	    var text = shown.data('text'),
	    type = shown.data('type'),
	    url = shown.data('url'),
            uname = shown.data('url-name');

	    if(type !== 'FILM'){
	
		function preload(image){
                  
                    //alert('preload testing - detail'+image);
                                         // Animation complete.
        	    $('#viewing .image').html('<img id="' + image_id + '" src="' + image + '" style="visibility:hidden"/>');

                    $("#viewing .image").preloader();

                    var update_url = "/work/detail/id/" + image_id;
                    if (($.browser.msie && $.browser.version >= 10) || !$.browser.msie) { //if ie 10 or not
                      window.history.pushState("", "SarahWadey", update_url);
                    }
                    $('#thumb-title').text(text);
		}
                
                if (uname.length <= 0){
                  uname = url.toUpperCase();
                }
                
                if(url.length > 0){
                    url = url.toLowerCase();
                    
                    if (/^http:\/\//.test(url)) {
                        $('div.thumb-next').html("<a href='"+url+"' target='_blank'>"+uname+" ></a>");
                    }
                    else{
                      $('div.thumb-next').html("<a href='http://"+url+"' target='_blank'>"+uname+" ></a>");
                    }
                    
                } else {
                    $('div.thumb-next').html('');
                }
	
		preload('/uploads/work/view/' + image);
                
                //GETS IMAGE DIMENSIONS SO THAT YOU CAN RE-SIZE APPROPRIATELY
                var imgSrc = '/uploads/work/view/' + image;
                $("<img/>").attr("src", imgSrc).load(function() {
                    _width = this.width; 
                    _height = this.height;
                    _ratio = _width / _height;
                    setDetailPageImageSize(_ratio);
                 });
                          
	    } 
            else {
              
                
                var update_video_url = "/work/detail/id/" + image_id;
                window.history.pushState("", "SarahWadey", update_video_url);
                $('#thumb-title').text(text);

                if (url.indexOf('http://vimeo.com/') !== -1){
                  short_url = url.replace('http://vimeo.com/', '');  
                }
                else if (url.indexOf('http://player.vimeo.com/video/') !== -1){
                  short_url = url.replace('http://player.vimeo.com/video/', '');  
                }
                else{
                  short_url = url.replace('http://vimeo.com/', '');
                }
	    
                //var frame = "<div class='vimeo_video'><iframe src='http://player.vimeo.com/video/" + short_url + "?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=ffffff' width=100' height=100% frameBorder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>";

              
		var frame = $('<iframe />', {
		    src : "http://player.vimeo.com/video/" + short_url,
		    //width: '100%',
		    //height: '100%',
		    width: '500',
		    frameBorder: '0',
		    webkitAllowFullScreen: 'true',
		    mozallowfullscreen: 'true',
		    allowFullScreen: 'true'
		});
                

		film_wrapper = $('<div id="film_wrapper" ><div class="video" ></div>');

		$('#viewing .image').html(film_wrapper);
		$('#viewing .image #film_wrapper .video').html(frame);
                
                $('#thumb-title').text(text);
                  
                /*
                if (url.length > 0) {
                  
                  uname = "LINK";
                  url = url.toLowerCase();
                  

                  if (/^http:\/\//.test(url)) {
                    $('div.thumb-next').html("<a href='" + url + "' target='_blank'>" + uname + " ></a>");
                  }
                  else {
                    $('div.thumb-next').html("<a href='http://" + url + "' target='_blank'>" + uname + " ></a>");
                  }

                } else {
                  $('div.thumb-next').html('');
                }      
                */
                
                
                var posV = function(){
                    var viewing_image = $('#viewing .image').height();
                    var viewing_video = $('#viewing .image .video').height();
                
                    $('#viewing .image #film_wrapper .video iframe').css({
                        marginTop: (viewing_image / 2) - (viewing_video / 2),
                        marginBottom: (viewing_image / 2) - (viewing_video / 2)
                    });
                };
                
                posV();
                
                $(window).resize(posV);
                setDetailPageImageSize(_ratio);
	    }
	}
    };
    
    $('.viewer').hover(function(){
	$('#action-btns').fadeIn();
    },

    function(){
	$('#action-btns').fadeOut('fast');
    });
    


    /*------------------ CLICK BUTTON EVENTS ---------------------------*/
    
    $('a#left-btn').click(function(evt){
        thumbnailPrevHideShow(evt);
    });
    
    $('a#right-btn, #viewing .image').click(function(evt){
        thumbnailNextHideShow(evt);
    });


    /*------------------ SWIPE UP AND DOWN EVENTS ------------------------*/

    $(".wrapper, #viewing .image").touchwipe({
        wipeUp: function(evt) { 
          evt.preventDefault();
        },
        wipeDown: function(evt) {
          evt.preventDefault();
        },
        preventDefaultEvents: false
    });


    /*------------------ SWIPE LEFT RIGHT EVENTS ------------------------*/

    $('a#right-btn, #viewing .image').touchwipe({wipeRight: function(evt){
      //alert('swiped left to go next');
        thumbnailPrevHideShow(evt);
    },
    preventDefaultEvents: false
    });

    $('a#left-btn, #viewing .image').touchwipe({wipeLeft: function(evt){
      //alert('swiped right to go prev');
        thumbnailNextHideShow(evt);
    },
    preventDefaultEvents: false
    });


    /*--------------------- KEY DOWN EVENTS ------------------------*/
 
    $(document).keydown(function(e){
        if(e.keyCode === 37){ //LEFT KEY
          thumbnailPrevHideShow(e);
        }
        else if(e.keyCode === 39){ //RIGHT KEY
          thumbnailNextHideShow(e);
        }
    });


    $('body').delegate('#viewing img', 'click', function(){
        $("#right-btn a").trigger('click');
   });
    
    $('.deeplink li:last-child').click(function(){
        return false;
    });
   
    $('.slider2 .image').click(function(evt){
        evt.preventDefault();
        if(!$(this).hasClass('shown')){
             $('.slider2 .image.shown img').css('opacity', '.3');
             $('.slider2 .image.shown').removeClass('shown');
             $(this).addClass('shown');
        }

        //reset image id
        var $image_id = $(this).attr("id");   
        //alert($image_id);
        
        //revent viewer box
        $('a#show_hide').text('THUMBNAIL VIEW');

          //add fixed property from footer
          $('.thumb-slider').addClass( 'give_thumb_properties' );
          
          //scroll stuff
          $('.scrollableArea').removeClass( 'remove_makeMeScrollable' );
          $('.kinetic-active').addClass( 'scrollWrapper' );
          $("#makeMeScrollable").smoothDivScroll({

            startAtElementId: $image_id,            
            hotSpotScrolling: $greater_than_8_elements,
            touchScrolling: $greater_than_8_elements,
            manualContinuousScrolling: false,
            visibleHotSpotBackgrounds: "always",
            mousewheelScrolling: $greater_than_8_elements            
          });
          
        
     });
    
    viewer.click(function(){
	viewerDisplay();
    });
    
    viewerDisplay();
    
    
    
    
    $('#action-btns a').click(function(){
	return false;
    });
    

    
    
    $(window).resize(function(){
	//s(); // slider1
	setDetailPageImageSize(_ratio);
    });
    
});



// MAKE ME SCROLLABLE PLUGIN
  $(document).ready(function () {
      
          var $image_id = "thumb_id_"+$("#viewing .image img").attr("id");
          //alert($image_id);
          
          var $greater_than_8_elements = true;
          
          if ($('#makeMeScrollable div').length < 8){
            $greater_than_8_elements = false;
          }
                      
          $("#makeMeScrollable").smoothDivScroll({

            startAtElementId: $image_id,
            hotSpotScrolling: $greater_than_8_elements,
            touchScrolling: $greater_than_8_elements,
            manualContinuousScrolling: false,
            visibleHotSpotBackgrounds: "always",
            mousewheelScrolling: false
            
            /*
                  mousewheelScrolling: "allDirections",
                  manualContinuousScrolling: true,
                  autoScrollingMode: "onStart"
            */
          });
          
  });


  /**
     * FUNCTION STICK FOOTER View Page Slider Fixed for Height
     */
    
    
function stick_footer() {  
  
    var slider_footer = $("#thumb-slider");
    
    if($(this).height() < 487) {
        slider_footer.removeClass("give_thumb_properties");
        slider_footer.addClass("give_thumb_properties_static");
    } else {
        slider_footer.removeClass("give_thumb_properties_static");
        slider_footer.addClass("give_thumb_properties");
    }


}                    
       