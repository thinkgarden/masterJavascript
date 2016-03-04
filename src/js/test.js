var path = require('path');
//  当发现有多个连续的斜杠时，会替换成一个； 当路径末尾包含斜杠时，会保留；
// 在 Windows 系统会使用反斜杠。
var p = path.normalize('foo/bar//baz/asdf/quux/..') ;
var p2 = path.normalize('foo/bar//baz/asdf/quux/../') ;
console.log('p',p,p2);
//组合参数中的所有路径，返回规范化后的路径。
var p3 = path.join('a/b/c',"d/c/v");
console.log('p3',p3);
// 返回文件的绝对路径
var p4 = path.resolve('app.js');
var p5 = path.resolve('/path/app.js');
console.log('p4',p4);
console.log('p5',p5);
//  var ab = path.isAbsolute('test.js');
//  console.log('ab',ab);
//  返回从 from 到 to 的相对路径
var res = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
console.log('res',res);
//path.resolve(from, path.relative(from, to)) == path.resolve(to)
// 文件的文件夹名称
var dir1 = path.dirname('../app.js');
var dir2 = path.dirname('./app.js');
var dir3 = path.dirname('app.js');
var dir4 = path.dirname('/foo/bar/baz/asdf/quux');
//dir1 ..
//dir2 .
//dir3 .
//dir4 /foo/bar/baz/asdf
console.log('dir1',dir1);
console.log('dir2',dir2);
console.log('dir3',dir3);
console.log('dir4',dir4);
// 返回后文件基本名称 第二个参数为 后缀名如果存在则返回除去后缀以后的名字
var base1 = path.basename('/foo/bar/baz/asdf/quux.html', '.html');
var base1 = path.basename('/foo/bar/baz/asdf/quux.html', '.htm');
var base2 = path.basename('/foo/bar/baz/asdf/quux.html', 'html');
var base3 = path.basename('/foo/bar/baz/asdf/quux.html');
//  base1 quux
//  base2 quux.
//  base3 quux.html
console.log('base1',base1);
console.log('base2',base2);
console.log('base3',base3);
// 返回后缀名,  没有则为空
var en1 = path.extname('test.js');
var en2 = path.extname('test');
console.log('en1 ', en1);
console.log('en2 ', en2);
//en1  .js
//en2
// path.sep 路径分隔符
var sp = 'foo/bar/baz'.split(path.sep);
//sp [ 'foo', 'bar', 'baz' ]
console.log('sp', sp);
// path.delimiter多个路径之间的分隔符
var del = process.env.PATH .split(path.delimiter);
console.log('del', del);
//de [ '/usr/local/bin'，
//    '/usr/bin'，
//    '/bin'，
//    '/usr/sbin'，
//    '/sbin'，
//    '/usr/local/bin'，
//    '/usr/local/git/bin' ]
