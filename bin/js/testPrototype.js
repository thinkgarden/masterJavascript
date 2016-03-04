function foo3() {
     function x() {};
     var x = 100;
     console.log(x);
 }
 // foo3(); // 100

 function Foo(){
 	this.x = 3;
 }
 Foo.prototype.y = 2;

 var obj3 = new Foo();

 // console.log(obj3.__proto__);
 // console.log(Object.getPrototypeOf(obj3));

 // console.log(Foo.prototype);
 // console.log(obj3.__proto__ === Foo.prototype);

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.LEGS_NUM = 2;
Person.prototype.ARMS_NUM = 2;

Person.prototype.hi = function() {
    console.log('Hi, my name is ' + this.name + ". I'm " + this.age + ' years old now');
};

function Student(name, age, className){
	Person.call(this,name,age);
	this.classNmae = className;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.construct=Student;

Student.prototype.hi = function() {
    console.log('Hi, my name is ' + this.name + ". I'm " + this.age + ' years old now, and from ' + this.className + ".");
};

Student.prototype.learn = function(subject) {
    console.log(this.name + ' is learning ' + subject + ' at ' + this.className + '.');
}

// console.log(Student.prototype);
// console.log(Student.prototype.__proto__);
// console.log(Student.prototype.__proto__ === Person.prototype);

var gao = new Student('Gao', '24', 'Class 3123');
// console.log(Object.getPrototypeOf(gao)); // 这个对象的具体内容见下图

var extend = function(protoProps){
    var parent = this,
        child;
    child = function(){
        parent.apply(this,arguments);
    }
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;

    //方便调用父类的方法
    child.__super__ = parent.prototype;

    $.extend(child, parent);

    $.extend(child.prototype, protoProps);

    return child;
}

Person.extend = extend;

var Teacher = Person.extend({
    subject:"English",
    teach:function(){
       console.log("My name is "+this.name + ".I'm teach" + this.subject+"."); 
    }

});

var t1 = new Teacher("li ming", 26);





