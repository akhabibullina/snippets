/**
 * Make all animations optional depending on variable doAnimate.
 * If doAnimate equals true then use $.animate()
 * Otherwise, use $.css()
 */

'use strict';
var toClass = {}.toString;

/**
 * A jQuery plugin handling the optional animations.
 * @param {type} cssStyle Object
 * @param {type} duration Number
 * @param {type} easing   Type of easing
 * @param {type} complete Callback
 * @returns {undefined|$.fn}
 */
$.fn.effects = function(cssStyle, duration, easing, complete) {

    // DOM node
    var node = this.get(0),
        doAnimate = true,
        type;

    // Ensure we have a DOM node 
    if (node === undefined) {
        return;
    }

    // type will help us to define the type of cssStyle variable value.
    type = toClass.call(cssStyle).slice(8, -1) || '';

    if (type === 'Object') {
        // Default values.
        var duration = duration || 400,
            easing   = easing   || 'swing',
            complete = complete || undefined;

        // Animations...
        if (doAnimate) {
            $(this).animate(cssStyle, duration, easing, complete);
        } else {
            // Or, simply apply the style.
            $(this).css(cssStyle);
            if (complete) {
                complete();
            }
        }
    }

    return this;
};