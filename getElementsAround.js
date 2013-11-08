/**
 * Gets the bounding elements based on previous or next siblings;
 * Second part of DFS algorithm used.
 * @param {Object} pickedRect
 * @param {HTMLObject} current
 * @param {boolean} next Defines which direction to use: nextSibling if true; previousSibling if false.
 * @returns {Object} res Two-element array containing bounding boxes:
 * - right & below boxes if next siblings are looked thhrough;
 * - above & left boxes if previous elements are looked through.
 * 
 * Example of result:
 * Object {above: input{Object}, left: head{Object}, below: p#p2{Object}}
 * 
 * Example of a call(where pickedRect = pickedElement.getBoundingClientRect()):
 * var prevBoxes = getElementsAround(pickedRect, pickedElement, false);
 * var nextBoxes = getElementsAround(pickedRect, pickedElement, true);
 * 
 */
function getElementsAround(pickedRect, current, next) {
    var res = {};
    var whichDirectionSibling = next? 'nextSibling' : 'previousSibling';

    return function _recurse(pickedRect, current) {
        if (Object.keys(res).length === 2) {
            return res;
        }

       var iter = current[whichDirectionSibling];

        if (!iter) {
            if ($.inArray(current.localName, nonVisualElementsArray) >= 0) {
                return res;
            }
            iter = current.parentNode;
            current = iter;
            return _recurse(pickedRect, current);
        }

        while (iter.nodeType != 1) {
            iter = iter[whichDirectionSibling];
            if (!iter) {
                if ($.inArray(current.localName, nonVisualElementsArray) >= 0) {
                    return res;
                }
                iter = current.parentNode;
                current = iter;
                return _recurse(pickedRect, current);
            }
        }

        current = iter;
        var rect = current.getBoundingClientRect();
        if (next) {
            if (!res['below'] && (Math.abs(rect.top) >= Math.abs(pickedRect.bottom))) {
                res['below'] = current;
            }
            if (!res['right'] && (Math.abs(rect.left) >= Math.abs(pickedRect.right))) {
                res['right'] = current;
            }
            return _recurse(pickedRect, current);
        }
        // Previous
        if (!res['above'] && (Math.abs(rect.bottom) <= Math.abs(pickedRect.top))) {
            res['above'] = current;
        }
        if (!res['left'] && (Math.abs(rect.right) <= Math.abs(pickedRect.left))) {
            res['left'] = current;
        }

        return _recurse(pickedRect, current);

    }(pickedRect, current);
}