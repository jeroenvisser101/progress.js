/**
 * ProgressJS
 * 
 * Copyright (c) 2016 Jeroen Visser
 * 
 * https://github.com/jeroenvisser101/progress.js
 */
(function (document) {
    'use strict';

    /**
     * Progress.js
     *
     * @param {HTMLElement} target  The target element which will hold the indicator.
     * @param {Object}      options Object containing options
     * @constructor
     */
    var Progress = function (target, options) {
        // Make sure the target is defined
        if (!target) {
            throw new InvalidArgumentException('Target must be set in order to use this class.');
        }

        // Make sure options given is an object
        if (typeof options !== 'object') {
            options = {};
        }

        // SVG related variables
        this.nsURI = 'http://www.w3.org/2000/svg';
        this.svg = null;
        this.indicator = null;

        // Some instance variables
        this.target = target;
        this.settings = {};
        this.defaults = {
            // The diameter of the circle
            size: 100,

            // The width of the stroke
            stroke_width: 8,

            // If it counts down, the display will change (reversed)
            reverse: false,

            // If there is a background, we'll make 2 circles, and add .background class to it.
            background: true
        };


        // Default settings
        this.settings = defaults(options, this.defaults);

        // Draw the circle
        this.drawSVGCircle();

        // Add it to the target
        this.target.appendChild(this.svg);
    };

    /**
     * Draws the circle and it's background in `this.svg`.
     */
    Progress.prototype.drawSVGCircle = function () {
        // Create the SVG object, set the size, add a class
        this.svg = document.createElementNS(this.nsURI, 'svg');
        this.svg.style.width = this.svg.style.height = this.settings.size + 'px';
        this.svg.setAttribute('class', 'progress-js');

        // Create 2 circles, background and the indicator
        if (this.settings.background) {
            this.svg.appendChild(this.drawSVGPath('background'));
        }
        this.svg.appendChild(this.indicator = this.drawSVGPath('indicator'));

        // Set the start value to 0 percent (to make the start animation work)
        this.set(0, false);
    };

    /**
     * Draws a circle path inside the svg.
     *
     * @param {string} name The name of the path (used in the class)
     * @returns {Element}
     */
    Progress.prototype.drawSVGPath = function (name) {
        var svg_path,
            stroke_width = this.settings.stroke_width,
            half_size = this.settings.size / 2,
            radius = half_size - stroke_width / 2,
            path =
                'M ' + half_size + ', ' + stroke_width / 2 +
                'a ' + radius + ',' + radius + ' 0 0,0 0,' + (radius * 2) +
                'a ' + radius + ',' + radius + ' 0 0,0 0,' + (radius * -2);

        // Create the indicator
        svg_path = document.createElementNS(this.nsURI, 'path');
        svg_path.setAttribute('d', path);
        svg_path.style.strokeWidth = stroke_width;
        svg_path.setAttribute('class', name);

        this.svg.appendChild(svg_path);

        return svg_path;
    };

    /**
     * Sets the value of the indicator.
     *
     * @param {int} percentage
     * @param {boolean} [animate] Defaults to true
     */
    Progress.prototype.set = function (percentage, animate/* = true */) {
        // Default animate to true
        if (typeof animate === 'undefined') {
            animate = true;
        }

        // If we need to animate this, we delay execution of this function with 1ms
        // otherwise the transitions won't be used.
        if (animate) {
            var that = this;
            return setTimeout(function () {
                that.set(percentage, false);
            }, 1);
        }

        // Check if the percentage given is valid
        if (percentage < 0 || percentage > 100) {
            throw new InvalidArgumentException('Percentage should be between 0 and 100.');
        }

        var total_length = this.indicator.getTotalLength(),
            offset,
            percentage_float = percentage / 100;

        // If we count down, the offset will be calculated differently
        if (this.settings.reverse) {
            offset = total_length * percentage_float;
        } else {
            offset = total_length * -(1 - percentage_float);
        }

        // Apply the styles
        this.indicator.style.strokeDasharray = [total_length, total_length];
        this.indicator.style.strokeDashoffset = offset;
    };

    /**
     * Exception to indicate that given arguments are invalid.
     *
     * @param {string} message Error message to be shown.
     * @constructor
     */
    var InvalidArgumentException = function (message) {
        this.message = message;
        this.name = 'InvalidArgumentException';
        this.toString = function () {
            return this.name + ': ' + this.message;
        };
    };

    /**
     * Sets default values on an object. Heavily inspired by Underscore.js
     *
     * @param {Object} obj
     * @returns {Object}
     * @source {http://underscorejs.org/#defaults}
     */
    var defaults = function (obj) {
        for (var i = 1, length = arguments.length; i < length; i++) {
            var source = arguments[i];
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    if (typeof obj[prop] === 'undefined') {
                        obj[prop] = source[prop];
                    }
                }
            }
        }
        return obj;
    };

    // Export it to window:
    window.Progress = Progress;
})(document);
