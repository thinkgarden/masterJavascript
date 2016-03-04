function myLogger(id){
	id = id || 'ADSLogwindow';
	var logWindow = null;
	//负责创建保存日志条目列表的DOM元素
	var createWindow = function(){
		var browserSize = ADS.getBrowserWindowSize();
		var top = ((browserSize.height - 200) / 2) || 0;
		var left = ((browserSize.width - 200) / 2) || 0;
		logWindow = document.createElement('ul');
		logWindow.setAttribute('id',id);
		logWindow.style.position = "absolute";
		logWindow.style.top = top+"px";
		logWindow.style.left = left+"px";

		logWindow.style.width = "300px";
		logWindow.style.height = "300px";
		logWindow.style.overflow = "scroll";
		logWindow.style.padding = "0";
		logWindow.style.margin = "0";
		logWindow.style.border = "0";
		logWindow.style.backgroundColor = "0";
		logWindow.style.listStyle = "none";
		logWindow.style.font = "10px/10px verdana, Tahoma, Sans";
		document.body.appendChild(logWindow);
	};
	this.writeRaw = function(message) {
		if(!logWindow) createWindow();
		var li = document.createElement('LI');
		li.style.padding = '2px';		
		li.style.border = '0';
		li.style.margin = '0';
		li.style.color = '#000';
		li.style.font = "10px/10px verdana, Tahoma, Sans";
		if(typeof message == 'undefined'){
			li.appendChild(document.createTextNode('Message was undefined'));
		} else if(typeof li.innerHTML != undefined){
			li.innerHTML = message;
		}else{
			li.appendChild(document.createTextNode(message));
		}
		logWindow.appendChild(li);
		return true;
	};
}

myLogger.prototype = {
	write: function(message) {
		if(typeof message == 'string' && message.length==0){
			return this.writeRaw('ADS.log:null message');
		}
		if(typeof message != 'string'){
			if(message.toString) return this.writeRaw(message.toString());
			else return this.writeRaw(typeof message);
		}
		// 转换<和>以便.innerHTML不会将message作为html解析
		message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		return this.writeRaw(message);
	},
	// 向窗口日志中写入一个标题
	header:function(message) {
		message = '<span style="color:white;background-color:black;font-weight:blod;padding:0px 5px;">'
		+message+'</span>';
		return this.writeRaw(message);
	}
} 

if(!window.ADS) {window['ADS'] = {};}
window['ADS']['log'] = new myLogger();