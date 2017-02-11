1 因为i是唯一的变量，setTimeout是异步执行，每次访问时i都是最终的值9，可以使用闭包来解决。

```js
  function print() {
    for (var i=0; i<10; i++) {
      (function(i){
        setTimeout(function() {
          console.log(i)
      }, 0)})(i)
    }
  }
```

2 箭头符号改变了当前函数的执行作用域.改成function就可以了 **

```js
  let printArgs = function () {
    for (let i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
    }
  };
  printArgs(1, 2, 3)  // will throw error
```

4、括号匹配

```js
  function isMatchingPair(str) {
    var stack = [],
      map = {
        '(': ')',
        '[': ']',
        '{': '}'
      };
    for (var i = 0; i < str.length; i++) {
      if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
        stack.push(str[i]);
      } else {
        var last = stack.pop();

        if (str[i] !== map[last]) {
          return false;
        }
      }
    }

    if (stack.length !== 0) {
      return false;
    }
  }
```

5、asyncOneByOne(答案是错的)

```js
  function asyncOneByOne (arr) {
    var promise = Promise.resolve();
    return promise.then(() => {
      arr[0]();
    }).then(()=>{
      arr[1]();
    })
  }
  function one(callback) {
      setTimeout(function(){
          console.log('first');
          // callback();
  }, 200); }
  function two(callback) {
      setTimeout(function(){
          console.log('second');
          // callback();
      }, 0);
  }
  // asyncOneByOne([one, two])
```
