function getStyleSheetContent() {
    // the style sheet in the style tag
    var length = document.styleSheets.length;
    for (var k = 0; k < length; k++) {
        var sheet = document.styleSheets[k];

        var message = "";
        if ('cssText' in sheet) {   // Internet Explorer
            message = sheet.cssText;
        }
        else {  // Firefox, Opera, Google Chrome and Safari
            for (var i = 0; i < sheet.cssRules.length; i++) {
                message += sheet.cssRules[i].cssText;
            }
        }
        document.write('Stylesheet #' + k + ': ' + message);
    }
}