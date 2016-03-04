  //js创建对象
  // 组合构造函数及原型模式
  // 构造函数模式用于定义实例的属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方方法的引用，最大限度的节约内存。此外，组合模式还支持向构造函数传递参数，可谓是集两家之所长。
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
	this.lessons = ['Math', 'Physics'];
}
Person.prototype = {
    constructor: Person,//原型字面量方式会将对象的constructor变为Object，此外强制指回Person
    getName: function () {
        return this.name;
    }
}
var person1 = new Person('Jack', 19, 'SoftWare Engneer');
person1.lessons.push('Biology');
var person2 = new Person('Lily', 39, 'Mechanical Engneer');
alert(person1.lessons);//Math,Physics,Biology
alert(person2.lessons);//Math,Physics
alert(person1.getName === person2.getName);//true,//共享原型中定义方法




//js对象之间的"继承"的五种方法

function Animal(){ };
Animal.prototype.species = "动物";

function Cat(name,color){
	this.name = name;
	this.color = color;
}

/**
 * 1构造函数绑定
 * 第一种方法也是最简单的方法，使用call或apply方法，将父对象的构造函数绑定在子对象上，
 * 即在子对象构造函数中加一行：
 */
// function Cat(){
// 	Animal.apply(this,arguments);
// 	this.name = name;
// 	this.color = color;
// }
// var cat1 = new Cat("大毛","黄色");
// console.log(cat1.species); // 动物

/**
 * 二、 prototype模式
 * 如果"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了。
 */
// Cat.prototype = new Animal();
// Cat.prototype.constructor = Cat;
// var cat1 = new Cat("大毛","黄色");
// console.log(cat1.constructor);
// console.log(cat1.species); // 动物

/**
 * 三、直接继承prototype
 */
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
// 与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。

/**
 * 四、 利用空对象作为中介
 */
function extend(Child, Parent) {
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
}

extend(Cat,Animal);
var cat1 = new Cat("大毛","黄色");
console.log(cat1.species); // 动物
  
console.log(Animal.prototype.constructor); // Animal
  



