var raf = require('raf')
  , EventEmitter = require('events').EventEmitter

module.exports = ticker

function ticker(element, rate, limit) {
  var millisecondsPerFrame = 1000 / (rate || 60)
    , time = 0
    , emitter

  limit = arguments.length > 2 ? +limit + 1 : 2
  emitter = raf(element || window).on('data', function(dt) {
    var n = limit

    time += dt
    while (time > millisecondsPerFrame && n) {
      time -= millisecondsPerFrame
      n -= 1
      emitter.emit('tick')
    }
    time = (time + millisecondsPerFrame * 1000) % millisecondsPerFrame

    if (n !== limit) emitter.emit('draw')
  })

  return emitter
}
