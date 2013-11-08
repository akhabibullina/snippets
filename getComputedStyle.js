function getStyleObject(dom) {
  var myDom = dom instanceof $ ? dom.get(0) : dom;
  var returns = {};
  // If browser's function 'getComputedStyle' is declared then use it.
  if (getComputedStyle && myDom.nodeType === myDom.ELEMENT_NODE) {
    var camelize = function(a, b) {
      return b.toUpperCase();
    }

    var computedStyle = getComputedStyle(myDom, "");

    if (computedStyle) {
      for(var i = 0, l = computedStyle.length; i < l; i++) {
        var prop = computedStyle[i];
        var camel = prop.replace(/\-([a-z])/g, camelize);
        var val = computedStyle.getPropertyValue(prop);
        returns[camel] = val;
      }
    }
    return returns;
  }
  return {};
}