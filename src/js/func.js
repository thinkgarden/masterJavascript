var myObject = ((function() {
  var value = 0;
  return {
    increament: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function() {
      return value;
    }
  };
})());

var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = "#ffff" + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 1000);
    }
  };
  setTimeout(step, 1000);
};

// fade(document.body);

function _LazyMan(name) {
  this.tasks = [];
  var self = this;
  var fn = (function(name) {
    return function() {
      console.log('Hi This is ' + name + "!");
      self.next();
    };
  })(name);
  this.tasks.push(fn);
  setTimeout(function() {
    self.next();
  }, 0);
}

_LazyMan.prototype.next = function() {
  var fn = this.tasks.shift();
  fn && fn();
};

_LazyMan.prototype.eat = function(name) {
  var self = this;
  var fn = (function(name) {
    return function() {
      console.log('Eat ' + name + "~");
      self.next();
    };
  })(name);

  this.tasks.push(fn);
  return this;
};

_LazyMan.prototype.sleep = function(time) {
  var self = this;
  var fn = (function(time) {
    return function() {
      setTimeout(function() {
        console.log('Wake up after ' + time + "s!");
        self.next();
      }, time * 1000);
    };
  })(time);

  this.tasks.push(fn);
  return this;
};

_LazyMan.prototype.sleepFirst = function(time) {
  var self = this;
  var fn = (function(time) {
    return function() {
      setTimeout(function() {
        console.log('Wake up after ' + time + "s!");
        self.next();
      }, time * 1000);
    };
  })(time);

  this.tasks.unshift(fn);
  return this;
};

function LazyMan(name) {
  return new _LazyMan(name);
}

var data = {
  rows: [
    ["Lisa", 16, "Female", "2000-12-01"],
    ["Bob", 22, "Male", "1996-01-21"]
  ],
  metaData: [
    { name: "name", note: '' },
    { name: "age", note: '' },
    { name: "gender", note: '' },
    { name: "birthday", note: '' }
  ]
};
  // var result=[];
  // data.rows.forEach( function(item, index) {
  //   var obj={};
  //   item.forEach( function(ele, index) {
  //     // console.log(data.metaData[index].name)
  //     var key = data.metaData[index].name;
  //     obj[key] = ele;
  //   });
  //   result.push(obj);
  // });
  // console.log(result);

var result = data.rows.reduce(function(prev1, cur1) {
  prev1.push(data.metaData.reduce(function(prev, cur, index) {
    prev[cur.name] = cur1[index];
    return prev;
  }, {}));
  return prev1;
}, []);
console.log(result);
