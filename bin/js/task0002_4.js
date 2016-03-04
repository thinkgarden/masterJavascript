(function(){

	var suggestData = ['Simon', 'Erik', 'Kener'];


	var createTipBox = function(arr){
		var ul = document.createElement("ul");
		ul.id="tipBox";

		each(arr,function(item,index){
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(item));
			ul.appendChild(li);
		});
		$(".wrap").appendChild(ul);

	}

	$.on("#inputWord","keyup",function(e){
		var keyword = $("#inputWord").value;
		if(!keyword) return;
		// var data = ajax.post("/search",keyword);
		createTipBox(suggestData);

	})
})()