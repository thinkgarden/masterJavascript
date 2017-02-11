function EventEmitterMicro() {
  this._events = {};
}

var j = EventEmitterMicro.prototype;

j.on = function(type, fn) {
  this._events[type] = this._events[type] || [];
  this._events[type].unshift(fn);
};

j.once = function(type, fn) {
  var that = this;

  function c(f) {
    that.off(type, c);
    if (f !== undefined) {
      fn(f);
    } else {
      fn();
    }
  }
  this.on(type, c);
};

j.off = function(type, fn) {
  if (!this.has(type)) {
    return;
  }
  var b = this._events[type].indexOf(fn);
  if (b === -1) {
    return;
  }
  this._events[type].splice(b, 1);
};

j.trigger = function(type, options) {
  if (!this.has(type)) {
    return;
  }
  for (var b = this._events[type].length - 1; b >= 0; b--) {
    if (options !== undefined) {
      this._events[type][b](options);
    } else {
      this._events[type][b]();
    }
  }
};

j.has = function(type) {
  if (type in this._events === false || this._events[type].length === 0) {
    return false;
  }
  return true;
};

j.destroy = function() {
  for (var a in this._events) {
    this._events[a] = null;
  }
  this._events = null;
};

function Event1() {
  EventEmitterMicro.call(this);
}

Event1.prototype = Object.create(EventEmitterMicro.prototype);


var Event = new Event1();
// console.log(Event);
Event.on('test', function(result) {
  console.log(result);
});
Event.on('test', function() {
  console.log('test');
});
Event.trigger('test', 'hello world');

//a => {};

//a => {};
