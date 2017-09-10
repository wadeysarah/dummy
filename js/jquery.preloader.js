/**
* Image Preloader 1.1 // 2011.01.31
* <http://idered.pl/news/jquery/preloader/>
* 
* @author    Idered <IderedPL@gmail.com>
*/
/*
$.fn.preloader = function(options) {
        var defaults = {
                onDone : function() {
                },
                onEachLoad : function(img) {
                },
                onLoadError : function(img) {
                },
                fadeIn : 500,
                delay : 100,
                interval : 200,
                parentWrap : 'a',
                loader : 'img/loader.gif'
        },
        options = $.extend(defaults, options),
        images = $(this).find('img'),
        loaderCss = {
                background : 'url(' + options.loader + ') 50% 50% no-repeat',
                display : 'inline-block'
        },
        delayTime = 0
        loadError = false;
        
        images.css({
                        visibility : 'visible',
                        opacity : 0
                }).each(function() {
                        if($(this).parent(options.parentWrap).length) 
                                $(this).parent(options.parentWrap).css(loaderCss);
                        else 
                                $(this).wrap('<a class="unwrap"/>').parent().css(loaderCss);
                });
        
        var timer = setInterval(function() {
                        init();
                }, options.interval);
        
        init = function() {
                images = images.filter(function() {
                
                                this.onerror = function() {
                                        loadError = true;
                                };                              
                                
                                if(loadError == 1) {
                                
                                        $(this).css({ visibility : 'visible',   opacity : 1 });
                                        
                                        if($(this).parent().hasClass('unwrap')) 
                                                $(this).unwrap();
                                        else 
                                                $(this).parent().attr('style', '');
                                                
                                        options.onLoadError($(this));
                                        
                                        return null;                                    
                                } else if(this.complete && this.naturalWidth !== 0) {                           
                                
                                        delayTime = delayTime + options.delay;
                                        $(this).css({ visibility : 'visible' })
                                                .delay(delayTime).animate({ opacity : 1 }, options.fadeIn, function() {
                                                
                                                        if($(this).parent().hasClass('unwrap')) 
                                                                $(this).unwrap();
                                                        else 
                                                                $(this).parent().attr('style', '');
                                                                
                                                        options.onEachLoad($(this));
                                                });
                                } else
                                        return this;
                        }
                );
                
                if(images.length == 0) {
                        clearInterval(timer);
                        options.onDone();
                }               
        };
}
*/


/* OLD PRELOADER  */
$.fn.preloader = function(options){
	//alert('loading preloader');
	var defaults = {
                              delay:100,
                              preload_parent:"a",
                              check_timer:200,
                              ondone:function(){ },
                              oneachload:function(image){  },
                              fadein:500 
                        };
	
	// variables declaration and precaching images and parent container
	 var options = $.extend(defaults, options);
	 var root = $(this);
         
         if (($.browser.msie && $.browser.version >= 10) || !$.browser.msie) { //if ie 10 or not
         {
            var images = root.find("img").css({"visibility":"hidden",opacity:0});                    
         }
         var timer = 0;  
         var counter = 0; 
         var i=0; 
         var checkFlag = [];
         var delaySum = options.delay;
	 
	 init = function(){
		
		timer = setInterval(function(){
			
			if(counter>=checkFlag.length)
			{
			clearInterval(timer);
			options.ondone();
			return;
			}
		
			for(i=0;i<images.length;i++)
			{
				if(images[i].complete==true)
				{
					if(checkFlag[i]==false)
					{
						checkFlag[i] = true;
						options.oneachload(images[i]);
						counter++;
						
						delaySum = delaySum + options.delay;
					}
					
					$(images[i]).css("visibility","visible").delay(delaySum).animate({opacity:1},options.fadein,
					function(){ 
                                          $(this).parent().removeClass("preloader");   
                                          options.onEachLoad($(this));
                                      });
					
					
					
				 
				}
			}
		
			},options.check_timer) 
		 
		 
		 } ;
	
	images.each(function(){
	  
		if($(this).parent(options.preload_parent).length==0)
		$(this).wrap("<a class='preloader' />");
		else
		$(this).parent().addClass("preloader");
		
		checkFlag[i++] = false;
		
		
		}); 
	images = $.makeArray(images); 
	
	
	var icon = jQuery("<img />",{
		
		id : 'loadingicon' ,
		src : 'css/images/89.gif'
		
		}).hide().appendTo("body");
	
	
	
	timer = setInterval(function(){
		
		if(icon[0].complete==true)
		{
			clearInterval(timer);
			init();
			 icon.remove();
			return;
		}
		
		},100);
	
	}
	

}