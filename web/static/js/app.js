// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
// import 'deps/phoenix_html/web/static/js/phoenix_html'

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from './socket'
// Import the game
import {Game} from './game'

window.nextLevelSnowflake = (function () {
  'use strict';

  function nextLevelSnowflake(array, fractal) {
    var newArray = [];
    var end = array.length - 1;

    for (var i = 0; i < end; i++) {
      var thisPoint = array[i];
      var nextPoint = array[i + 1];

      newArray.push(thisPoint);

      var generatedPoints = fractal(thisPoint, nextPoint);

      for (var j = 0; j < generatedPoints.length; j++) {
        newArray.push(generatedPoints[i]);
      }
    }

    newArray.push(array[array.length - 1]);

    return newArray;
  }

  return nextLevelSnowflake;
}).call(this);

function redrawSnowflake(array) {
  graphics.moveTo(array[0].x, array[0].y);
  for (var i = 1; i < array.length; i++) {
    var point = array[i];
    graphics.lineTo(point.x, point.y);
  }

  graphics.endFill()
}

window.initializeFractalGenerator = function initializeFractalGenerator() {
  var array = [
    { x: 50, y: 50 },
    { x: 250, y: 50 },
    { x: 100, y: 100 }
  ];

  window.onclick = function () {
    array = nextLevelSnowflake(array, function(start, end) {
      return [];
      // var startToEnd = {
      //   x: end.x - start.x,
      //   y: end.y - start.y,
      // };
      // var length = Math.sqrt(startToEnd.x*startToEnd.x + startToEnd.y*startToEnd.y);
      //
      // return [
      //   {
      //     x: start.x + startToEnd.x / 3,
      //     y: start.y + startToEnd.y / 3,
      //   },
      //   {
      //   },
      //   {
      //     x: start.x + 2*startToEnd.x/3,
      //     y: start.y + 2*startToEnd.y/3,
      //   }
      // ];
    });

    redrawSnowflake(array);
  };

  redrawSnowflake(array);
}

// Lets go!
new Game(700, 450, 'phaser')
