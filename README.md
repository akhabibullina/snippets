Code snippets
========

Some pieces of code that I ones wrote and intent to re-use in the future.

Stuff inside
---------


#### Color.js
Converts both colors to the same [RGB] format and then find out if they are contrast.

#### Effects.js
Makes all animations optional depending on variable doAnimate.

#### getComputedStyle.js
x-browser implementation of getComputedStyle.

#### getElementsAround.js
Gets the bounding elements based on previous or next siblings.

#### getStyleSheetContent.js
Gets the stylesheet object in x-browser way.

#### Invert.js
A jQuery plugin that reverses the colors of the element using CSS3 effects.

Example of usage:
* Note: jquery is a dependency
* Download the script
* Add a script to the page that is going to use it ```  <script src="invert.js"></script> ```
* Now it is ready to use:
```
      $(document).ready(function() {
        $('body').invert();
        $(document).on('keypress', function(event) {
          if (event.keyCode === 32) { // space
            $(event.target).invert('revert');
          }
        });
      });
```
