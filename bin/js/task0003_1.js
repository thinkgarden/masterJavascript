
// var name="slowfish";
// function echo(){
// 	console.log(name);
// 	var name = "temp";
// 	console.log(name);
// 	console.log(age);
// }
// echo();


// var name = 'laruence';
//  function echo() {
//       console.log(name);
//  }

//  function env() {
//       var name = 'eve';
//       echo();
//  }

//  env(); //laruence


function factory() {
 	var name = 'laruence';
	 var intro = function(){
	      alert('I am ' + name);
	 }
	 return intro;
}

function app(para){
	var name = para;
 	var func = factory();
 		func();
	}
}

app('eve');
