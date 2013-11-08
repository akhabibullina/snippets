var kRegExpRGBString = /\d+(\.\d+)?%?/g,
    kRegExpHEXValidString = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

/*
 * Converts both colors to the same [RGB] format and then find out if they are contrast.
 * @param colorOne String/CSSPrimitiveValue represents one of the colors to compare
 * @param colorTwo String/CSSPrimitiveValue represents the other color to compare
 * @return Boolean true if colors are contrast; false otherwise
 */
function getIsContrastColors(colorOne, colorTwo) {
    var colorOneTone = isLightTone(colorOne);
    var colorTwoTone = isLightTone(colorTwo);
    // Now that we have both colors tones, define if they are contrast or not.
    return (colorOneTone === colorTwoTone) ? false : true;
};

function isLightTone(colorValue) {
    RGBColor = getRGBColor(colorValue);
    // http://en.wikipedia.org/wiki/YIQ
    var yiq = ((RGBColor.r * 299) + (RGBColor.g * 587) + (RGBColor.b * 114)) / 1000;

    return  yiq >= 128;
};

/*
 * Converts color given RGB format.
 * @param colorValue String/CSSPrimitiveValue
 * @return Object of RGB format {r: numericValue, g: numericValue, b: numericValue}
 */
function getRGBColor(colorValue) {
    // Sring
    if ({}.toString.call(colorValue) === '[object String]') {
        return Rgb(colorValue);
    }
    // CSSPrimitiveValue
    var resultRGBColor = {r: 255, g: 255, b: 255}
    , valueType
            , rgb
            ;
    try {
        valueType = colorValue.primitiveType;
        if (valueType === CSSPrimitiveValue.CSS_RGBCOLOR) {
            rgb = colorValue.getRGBColorValue();
            resultRGBColor.r = rgb.red.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);
            resultRGBColor.g = rgb.green.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);
            resultRGBColor.b = rgb.blue.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);

        }
    } catch (e) {
        // Just temporary logging, to make sure code always works as expected.
        sitecues.log.warn('Attempt to get RGB color failed.');
    }
    return resultRGBColor;
};

/*
 * Calculates opposite color to the one given as parameter.
 * @param colorValue String/CSSPrimitiveValue
 * @return String that represents RGB value. Format : 'rgb(numericValueR, numericValueG, numericValueB)'
 */
function getRevertColor(colorValue) {
    var RGBColor = getRGBColor(colorValue);
    return 'rgb(' + (255 - RGBColor.r) + ', ' + (255 - RGBColor.g) + ', ' + (255 - RGBColor.b) + ')';
};

/*
 * Check if current image value is not empty.
 * @imageValue A string that represents current image value.
 * @return true if image value contains some not-empty value.
 */
function isEmptyBgImage(imageValue) {
    return isEmpty(imageValue) || imageValue === 'none';
};

/*
 * Using image object element it gets its average color by means of the canvas.
 * @param imgEl An object.
 * @return rgb A string which represents the average image color in RGB format.
 */
function getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r: 0, g: 0, b: 0}, // for non-supporting envs
    canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r: 0, g: 0, b: 0},
    count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        // alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;
};

/*
 * Returns an object of RGB components converted from a string containing either RGB or HEX string.
 */
function Rgb(rgb) {
    if (!(this instanceof Rgb)) {
        return new Rgb(rgb);
    }
    var defaultColor = [255, 255, 255]
            , c = rgb.match(kRegExpRGBString)
            ;
    // RGB
    if (c) {
        c = c.map(function(itm) {
            // Take care of plain numbers as well as percentage values
            if (itm.indexOf('%') !== -1) {
                itm = parseFloat(itm) * 2.55;
            }
            return parseInt(itm, 10);
        });
    } else if ((kRegExpHEXValidString).test(rgb)) {
        // Valid HEX
        c = [];
        c[0] = hexToR(rgb);
        c[1] = hexToG(rgb);
        c[2] = hexToB(rgb);
    } else {
        c = defaultColor;
    }
    this.r = c[0];
    this.g = c[1];
    this.b = c[2];
}

function hexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16);
};
function hexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16);
};
function hexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16);
};
function cutHex(h) {
    return (h.charAt(0) === '#') ? h.substring(1, 7) : h;
};

/**
 * Capitalizes the first letter of the string given as an argument.
 */
function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Checks if the value given is empty or not.
 */
function isEmpty(val) {
    return !val || val.trim() === '';
};

