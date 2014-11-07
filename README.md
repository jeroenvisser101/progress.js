# Progress.js
![size: 818 bytes](https://img.shields.io/badge/size-818%20bytes-green.svg?style=flat)
[![Tips I get](https://img.shields.io/gratipay/jeroenvisser101.svg?style=flat)](https://gratipay.com/jeroenvisser101/)

Progress.js is a very small, standalone library that makes it easy to use circular progress indicators. It uses no library, just vanilla JavaScript and CSS3 for animations. However, it integrates in any jQuery project fairly easily!

## How it's done
Progress.js uses SVG paths to draw circles, and uses `stroke-dasharray` and `stroke-dashoffset` to draw just a part of the circle. It's as simple as that. To make it easy, we draw the SVG for you. We do some calculations to determine what the `dasharray` and `dashoffset` should be, and the rest just works! You can style, animate it and add proper easing with CSS. Easy right?

## Usage
Usage is simple. There are some examples below, and on the documentation page there are even more.

### Basic circle, animated and with background
``` html
<style>
  svg.progress-js path {
    fill: none;
    stroke-linecap: round;
  }
  svg.progress-js path.indicator {
    stroke-color: #2BCDFC; /* Indicator color */

    /* Animate the indicator */
    -webkit-transition: .6s stroke-dashoffset ease-out;
    -moz-transition: .6s stroke-dashoffset ease-out;
    transition: .6s stroke-dashoffset ease-out;
  }
  svg.progress-js path.background {
    stroke-color: rgba(0, 0, 0, .1); /* Background color */
  }
</style>
<div class="target"></div>
<script>
  // Create the progressbar itself
  var progress = new Progress(document.querySelector('.target'), {
    size: 100, // The diameter of the circle, in pixels
    stroke_width: 4 // The width of the stroke, in pixels
    // Background will be on by default
  });

  // Set the value to 10%
  progress.set(10);
</script>
```

### Basic circle, counting down, no animation and without a background
``` html
<style>
  svg.progress-js path {
    fill: none;
    stroke-linecap: round;
  }
  svg.progress-js path.indicator {
    stroke-color: #2BCDFC; /* Indicator color */
  }
</style>
<div class="target"></div>
<script>
  // Create the progressbar itself
  var progress = new Progress(document.querySelector('.target'), {
    size: 100, // The diameter of the circle, in pixels
    stroke_width: 4, // The width of the stroke, in pixels
    background: false, // Disable the background
    reverse: true // Count down, instead of up
  });

  // Set the value to 10%
  progress.set(10);
</script>
```

### Basic circle, using jQuery
``` html
<style>
  svg.progress-js path {
    fill: none;
    stroke-linecap: round;
  }
  svg.progress-js path.indicator {
    stroke-color: #2BCDFC; /* Indicator color */
  }
  svg.progress-js path.background {
    stroke-color: rgba(0, 0, 0, .1); /* Background color */
  }
</style>
<div class="target"></div>
<script>
  // Create the progressbar itself
  var progress = new Progress($('.target').get(0), {
    size: 100, // The diameter of the circle, in pixels
    stroke_width: 4 // The width of the stroke, in pixels
  });

  // Set the value to 10%
  progress.set(10);
</script>
```

## Contributing
Contributing to this project is highly appreciated. You can contribute by:
 - Fixing/submitting issues
 - Submitting/testing Pull-Requests
