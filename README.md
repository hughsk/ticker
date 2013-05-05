# ticker #

A module for running animation and game loops with
[browserify](http://browserify.org/).

You've probably heard of
[`requestAnimationFrame`](http://caniuse.com/#feat=requestanimationframe): a
helpful method for running animations at higher frame rates than `setInterval`.
It works really well for rendering animations to the screen, adjusting the
speed to fit your screen refresh rate and battery life, etc.

Unfortunately it's not predictable - it tends to fluctuate quite a
bit, and leaves you with results either far too fast or too slow depending on
the device. You could use setInterval, but that can be unreliable too. Keeping
track of [delta time](http://viget.com/extend/time-based-animation) is a good
solution, but it too can behave differently depending on the frame rate.

So ticker handles running your update loop at a more consistent rate - either
speeding it up or slowing it down in response to performance,
[this way](http://gafferongames.com/game-physics/fix-your-timestep/).

## Installation ##

``` bash
npm install ticker
```

## Usage ##

**ticker = require('ticker')(element, framerate, skips)**

Creates a new ticker instance.

* `element` should either be `window` or the canvas element you're drawing to.
* `framerate` is the number of frames per second you'd like to tick, and
  defaults to 60.
* `skips` is the maximum frames you'd like to skip per render. Defaults to 1.
  Set to 0 to disable entirely.

**ticker.on('tick', callback)**

Emitted for every frame of logic you should to run.

**ticker.on('draw', callback)**

Emitted for every draw call you should run.

``` javascript
var ticker = require('ticker')
  , canvas = document.createElement('canvas')
  , ctx = canvas.getContext('2d')
  , x = 0
  , y = 0

ticker(window, 60).on('tick', function() {
  x += Math.round(Math.random()*2-1)*10
  y += Math.round(Math.random()*2-1)*10
}).on('draw', function() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'
  ctx.fillRect(x, y, 10, 10)
})
```
