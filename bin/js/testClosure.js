// 1
// var name = "the window";
// var object = {
// 	name:"myobject",
// 	getNameFunc:function(){
// 		return function(){
// 			return this.name;
// 		}
// 	}
// }

// console.log(object.getNameFunc()());


var name = "the window";
var object = {
	name:"myobject",
	getNameFunc:function(){
		var that = this;
		return function(){
			return that.name;
		}
	}
}

console.log(object.getNameFunc()());