// jQuery Plugin Boilerplate
// A boilerplate for kick-starting jQuery plugins development
// version 1.3, May 07th, 2011
// by Stefan Gabos
// with help from Roger Padilla, Shinya, JohannC, Steven Black, Rob Lifford

// remember to change every instance of "pluginName" to the name of your plugin!
(function($) {

    // here it goes!
    $.fn.cropan = function(method) {

        // public methods
        // to keep the $.fn namespace uncluttered, collect all of the plugin's methods in an object literal and call
        // them by passing the string name of the method to the plugin
        //
        // public methods can be called as
        // element.pluginName('methodName', arg1, arg2, ... argn)
        // where "element" is the element the plugin is attached to, "pluginName" is the name of your plugin and
        // "methodName" is the name of a function available in the "methods" object below; arg1 ... argn are arguments
        // to be passed to the method
        //
        // or, from inside the plugin:
        // methods.methodName(arg1, arg2, ... argn)
        // where "methodName" is the name of a function available in the "methods" object below
        var methods = {

            // this the constructor method that gets called when the object is created
            init : function(options) {

                // the plugin's final properties are the merged default and user-provided properties (if any)
                // this has the advantage of not polluting the defaults, making them re-usable
                this.cropan.settings = $.extend({}, this.cropan.defaults, options);

                // iterate through all the DOM elements we are attaching the plugin to
                return this.each(function() {

                    var $element = $(this), // reference to the jQuery version of the current DOM element
                        element = this;     // reference to the actual DOM element

                    // code goes here
                    
                    //check if el needs to be copped and panned
                    if($element.width() > options.width)
                    {
                    	this.overflow = options.width - $element.width();
                    
                   		//wrap el in mask 
                    	$element.wrap('<div class="cropan-mask" style="position: relative; overflow: hidden; width: '+options.width+'px;" />')
                    	
                    	$element.css({'position': 'relative', 'left': '0'});
                    	
                    	this.animateIt = function() {
	                    	//animate element
	                    	$element.delay(options.pauseLength)
	                    					.animate({left: this.overflow}, options.animationLength, "linear")
	                    					.delay(options.pauseLength)
	                    					.animate({left: 0}, options.animationLength, "linear", this.animateIt);
	                    					
                    	}
                    	
                    	this.animateIt();
										}
                });

            },

            // a public method. for demonstration purposes only - remove it!
            foo_public_method: function() {

                // code goes here

            }

        }

        // private methods
        // these methods can be called only from inside the plugin
        //
        // private methods can be called as
        // helpers.methodName(arg1, arg2, ... argn)
        // where "methodName" is the name of a function available in the "helpers" object below; arg1 ... argn are
        // arguments to be passed to the method
        var helpers = {

            // a private method. for demonstration purposes only - remove it!
            foo_private_method: function() {

                // code goes here

            }

        }

        // if a method as the given argument exists
        if (methods[method]) {

            // call the respective method
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

        // if an object is given as method OR nothing is given as argument
        } else if (typeof method === 'object' || !method) {

            // call the initialization method
            return methods.init.apply(this, arguments);

        // otherwise
        } else {

            // trigger an error
            $.error( 'Method "' +  method + '" does not exist in cropan plugin!');

        }

    }

    // plugin's default options
    $.fn.cropan.defaults = {

        width: '100',
        animationLength: '1000',
				pauseLength: '1000'
    }

    // this will hold the merged default and user-provided options
    // you will have access to these options like:
    // this.pluginName.settings.propertyName from inside the plugin or
    // element.pluginName.settings.propertyName from outside the plugin, where "element" is the element the
    // plugin is attached to;
    $.fn.cropan.settings = {}

})(jQuery);