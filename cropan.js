// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

// remember to change every instance of "pluginName" to the name of your plugin!
(function($) {

    // here we go!
    $.cropan = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {

           	width: '100',
        		animationSpeed: '1000',
        		pauseLength: 300,
						autoStart: false,
						easing: "linear"
						//startOnMouseenter: true

        }

        // to avoid confusions, use "plugin" to reference the
        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('pluginName').settings.propertyName from outside the plugin,
        // where "element" is the element the plugin is attached to;
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
             element = element;    // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

           	// code goes here           
            if(eligible())
		        {
		        	plugin.settings.overflow = $element.width() - plugin.settings.width;
		        
		       		//wrap el in mask 
		        	$element.wrap('<div class="cropan-mask" style="position: relative; overflow: hidden; width: '+plugin.settings.width+'px;" />')
		        	$element.css({'position': 'relative', 'left': '0'});
						}

						if(plugin.settings.autoStart)
							plugin.startAnimation();
        }

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('pluginName').publicMethod(arg1, arg2, ... argn) from outside
        // the plugin, where "element" is the element the plugin is attached to;

        // a public method. for demonstration purposes only - remove it!
        plugin.startAnimation = function () {
        	plugin.animating = true;
        
		    	if(eligible())
		      {
			    	//animate element
			    	var animationLength = plugin.settings.animationSpeed * ( ( plugin.settings.overflow / 50 ) + 1 );
			    	
			    	$element.animate({left: plugin.settings.overflow*-1}, animationLength, plugin.settings.easing)
			    					.delay(plugin.settings.pauseLength)
			    					.animate({left: 0}, animationLength, plugin.settings.easing, function() { if(plugin.animating) { plugin.startAnimation(); } } );
			    }
		  	};
		  	
		  	plugin.stopAnimation = function () {
		  		plugin.animating = false;
		  		//$element.queue("fx", []);
		  		//$element.animate({left: 0}, plugin.settings.animationLength, plugin.settings.easing, plugin.startAnimation);2
		  	}
		  	
		  	plugin.animateLeft = function () {
  		    if(eligible())
		      {
			    	//animate element
			    	var animationLength = plugin.settings.animationSpeed * ( ( plugin.settings.overflow / 50 ) + 1 );
			    	
			    	$element.animate({left: plugin.settings.overflow*-1}, {queue: false}, animationLength, plugin.settings.easing);
			    }
		  	};

		  	plugin.animateRight= function () {
  		    if(eligible())
		      {
			    	//animate element
			    	var animationLength = plugin.settings.animationSpeed * ( ( plugin.settings.overflow / 50 ) + 1 );
			    	
			    	$element.animate({left: 0}, {queue: false}, animationLength, plugin.settings.easing);
			    }
		  	};
		  	

        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

        // a private method. for demonstration purposes only - remove it!
        var eligible = function() {

            if($element.width() > plugin.settings.width)
            	return true;
            else
            	return false;

        }

        // fire up the plugin!
        // call the "constructor" method
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.cropan = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('cropan')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.cropan(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('cropan', plugin);

            }

        });

    }

})(jQuery);