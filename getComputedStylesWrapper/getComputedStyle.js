/**
 * 
 * @param {type} $
 * @returns {undefined}
 */
(function($) {

    $.fn.getComputedStyle = function() {
        var element = this[0], computedStyles = {};
        // Apparetntly, IE.
        if (element.currentStyle) {
            // computedStyles	[object MSCurrentStyleCSSProperties]
            computedStyles = $.extend({}, element.currentStyle);
            // Traverse the computedStylesand get numeric values for every non-numeric one.
            var boundingBox = element.getBoundingClientRect();
            for (var prop in computedStyles) {
                if (!(+computedStyles[prop])) { // Not a numeric value.
                    // Try to get/calculate the appropriate numeric value.
                    var newValue = boundingBox[prop] || element.style[prop] || ($(element).css(prop) && parseFloat($(element).css(prop)));
                    if (newValue && !$.isFunction(newValue) ) {
                        computedStyles[prop] = newValue + 'px';
                    };
                }
            }
        } else {
            // It is not IE, you are lucky.
            computedStyles = window.getComputedStyle(element, null) || element.currentStyle;
        }
        return computedStyles;
    };

}(jQuery));