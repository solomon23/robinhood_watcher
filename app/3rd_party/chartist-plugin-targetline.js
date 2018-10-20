/* eslint-disable */
/*
  NOTE: SOLOMON
  These were not written properly to work with react-chartist.  I'll submit these changes are a PR but neither
  of these have been updated recently
*/

/**
 * Chartist.js plugin to display a target line on a chart.
 * With code from @gionkunz in https://github.com/gionkunz/chartist-js/issues/235
 * and @OscarGodson in https://github.com/gionkunz/chartist-js/issues/491.
 * Based on https://github.com/gionkunz/chartist-plugin-pointlabels
 */
/* global Chartist */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["chartist"], function (Chartist) {
      return (root.returnExportsGlobal = factory(Chartist));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("chartist"));
  } else {
    root['Chartist.plugins.ctTargetLine'] = factory();
  }
}({}, function (Chartist) {
  (function (window, document, Chartist) {

    var defaultOptions = {
      class: 'ct-target-line',
      value: null
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctTargetLine = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function ctTargetLine(chart) {
          function projectY(chartRect, bounds, value) {
            return chartRect.y1 - (chartRect.height() / bounds.max * value)
          }

          chart.on('created', function (context) {
            var targetLineY = projectY(context.chartRect, context.bounds, options.value);

            context.svg.elem('line', {
              x1: context.chartRect.x1,
              x2: context.chartRect.x2,
              y1: targetLineY,
              y2: targetLineY
            }, options.class);
          });
      };
    };
  }(window, document, Chartist));

  return Chartist.plugins.ctTargetLine;
}))
