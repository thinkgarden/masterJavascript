function isArray(arr) {
	isArray = function() {
		if (typeof Array.isArray === "function") {
			return Array.isArray; // ECMA5自带
		} else {
			return function(arr) {
                // Object.prototype.toString的行为：首先，取得对象的一个内部属性[[Class]]
				return Object.prototype.toString.call(arr) === "[object Array]"; // 不同的文档的数组是不一样的，直接用typeof无法识别这个区别
			}
		}
	}();
	return isArray(arr);
}

function isFunction1(fn) {
    return (typeof fn).toLowerCase() === "function";
}

function isFunction2(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
    
}

function cloneObject(obj){
	var result, oClass = isClass(obj);
	if(oClass === 'Array'){
		result = [];
	} else if(oClass === 'Object') {
		result = {};
	} else{
		return result;
	}
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			var copy = obj[key];
			if(isClass(copy)==='Array' || isClass(copy)==='Object') {
				result[key] = arguments.callee(copy); //arguments.callee是一个指向正在执行的函数指针
			} else{
				result[key] = copy;
			}
		}
	}
	return result;
}
// 判断对象类型
function isClass(obj) {
    if(obj === null) {
        return "Null";
    }else if(obj === undefined) {
        return "Undefined";
    }else {
        return Object.prototype.toString.call(obj).slice(8,-1);
    }
}


function uniqArray(arr) {
    var n = {},r = [];//n为hash表，r为临时数组
    for(var i = 0; i<arr.length; i++) {//遍历当前数组
        if(!n[arr[i]]) {//如果hash表中没有当前项
            n[arr[i]] = true;//存入hash表
            r.push(arr[i]);//把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i in arr){
    	fn(arr[i],i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var total = 0;
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			total++;
		}
	}
	return total;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var regex=new RegExp("^[a-zA-Z\\d_-]+@[a-zA-Z\\d_-]+\\.com$");
    return regex.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var regex=/^1[3|4|5|8][0-9]\d{4,8}$/;
    return regex.test(phone);
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element.classList){
    	element.classList.add(newClassName);
    }else{
    	var oldClassName=element.className;
    	var regex=new RegExp("\\b"+newClassName+"\\b","g");
    	if(!regex.test(oldClassName)){ //检测oldClassName中是否含有newClassName
    		element.className=oldClassName+" "+newClassName;
    	}
    }
}

// 检测是否存在样式
function hasClass(element, testClassName) {
    if(element.classList){
        return element.classList.contains(testClassName);
    }else{
        var oldClassName=element.className;
        var regex=new RegExp("\\b"+testClassName+"\\b","g");
        return regex.test(oldClassName);
    }
}


// 移除dom中的样式oldClassName
function removeClass(element, delClassName) {
    if(element.classList){
    	element.classList.remove(delClassName);
    }else{
    	var oldClassName=element.className;
    	var regex=new RegExp("\\b"+delClassName+"\\b\\s*","g");
    	if(regex.test(oldClassName)){
    		element.className=oldClassName.replace(regex,"");;
    	}
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var parNode1=element.parentNode,
        parNode2=siblingNode.parentNode;
    return parNode2===parNode1;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var res={x:0,y:0};
    var temp=element;
    while(temp.offsetParent !== null && temp.offsetParent!==document.body){
        res.x+=temp.offsetLeft;
        res.y+=temp.offsetTop;
        temp=temp.offsetParent; //注意这里的递归调用；
    }
    res.x+=temp.offsetLeft;
    res.y+=temp.offsetTop;
    return res;
}
// for ie<9
function getElementsByClassName (context,selCssName) {
    var temp=[];
    if(context.getElementsByClassName){
        temp=context.getElementsByClassName(selCssName);
    }else{
        var nodes=context.getElementsByTagName("*");
        for(var i=0,len=nodes.length; i<len; i++){
            if(hasClass(nodes[i],selCssName)){
                temp.push(nodes[i]);
            }
        }
    }
    return temp;
}

// 实现一个简单的Query,只返回一个元素
// 匹配选择器要逆向思维,从后往前查找，有两个情况列外：1.第一个选择器是id的时候，他会用byid缩小范围;  2.最后一个是tag的时候会用bytag缩小范围;  其他的情况就是把body里面的东西全拿出来挨个筛选
function $ (selector,context) {
    if(typeof selector !=="string")
        return null;
    selector=trim(selector);
    // if(typeof document.querySelector ==="function")
    //     return document.querySelector(selector);// querySelector查询属性选择器是，属性值要用引号/双引号包裹着
    context=context||document;
    var reqExpr=/^([^\s]+)\s*/;
    var matchs=reqExpr.exec(selector);
    var selItem=(matchs&&matchs.length>0)?matchs[1]:"";
    if(selItem === "")
        return null;
    var temp=null;
    if(selItem[0]==="#"){
        // 还要判断是否包含级联
        temp=document.getElementById(selItem.substring(1));
    }else if(selItem[0]==="."){
        var selCssName=selItem.substring(1);
        var temp=getElementsByClassName(context,selCssName);
        if(temp&&temp.length>0){
            temp=temp[0];
        }
    }else if(selItem[0]==="["){
        temp=null;
        var attrSel=selItem.substring(1,selItem.length-1).split("=");
        var key=attrSel[0];
        var val=attrSel.length>1?attrSel[1]:"";
        var childs=context.getElementsByTagName("*");
        for (var i = 0,len=childs.length; i < len; i++) {
            var attr=childs[i].getAttribute(key);
            if(!attr)
                continue;
            !val ? (temp=childs[i]) : (val===attr ? (temp=childs[i]) : void 0);
            if(!temp)
                continue;
            else
                break;
        }
    }else{
        temp=context.getElementsByTagName(selItem)[0];
    }

    if(!temp) 
        return null;
    var nexSel=selector.replace(reqExpr,""); //筛选剩余的元素；
    if(!nexSel)
        return temp;
    else{
        temp=$(selector.replace(reqExpr,""),temp);
        return temp;
    }
}

// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    var handlers=element.handlers||(element.handlers={});
    if(typeof element.addEventListener==="function"){
        var key=Date.now()+Math.random()*100;//有时候执行速度太快，Date.now()的值是一样的
        handlers[key]=listener;
        element.addEventListener(event,listener);
    }else if(typeof element.attachEvent==="function"){
        var key=Date.now()+Math.random()*100;
        handlers[key]=listener;
        element.attachEvent("on"+event,listener);
    }else{
        element["on"+event]=listener;
    }
}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if(typeof element.removeEventListener==="function"){
        if(!listener){
            var handlers=element.handlers;
            if(!handlers) return;
            for(var prop in handlers){
                element.removeEventListener(event,handlers[prop]);
            }
        }else{
            element.removeEventListener(event,listener);
        }
    }else if(typeof element.detachEvent==="function"){
        if(!listener){
            var handlers=element.handlers;
            if(!handlers) return;
            for(var prop in handlers){
                element.detachEvent("on"+event,handlers[prop]);
            }
        }else{
            element.detachEvent("on"+event,listener);
        }
    }else{
        element["on"+event]=listener;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,"click",listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,"keydown",function (e) {
        if(e.keyCode===13){
            listener.call(element,e);
        }
    });
}

// 判断一个选择器是什么类别
function getSelectorType (selector) {
    var res={
        idSelector:0,
        classSelector:0,
        attrSelector:0,
        tagSelector:0
    };
    trim(selector);
    if(selector[0]==="#"){
        res.idSelector=1;
    }else if(selector[0]==="."){
        res.classSelector=1;
    }else if(selector[0]==="["){
        res.attrSelector=1;
    }else{
        res.tagSelector=1;
    }
    return res;
}

// 事件委托
function delegateEvent(element, tag, eventName, listener) {
    element=element||document.body;
    $.on(element,eventName,function (e) {
        e=e||window.event;
        var target=e.target||e.srcElement;
        var filters=tag.split(" ");//要考虑多个选择器时怎么办
        for(var i=filters.length-1;i>=0;i--){
            var temp=filters[i].replace(/[#\.\[\]]/g,"");
            var selectorType=getSelectorType(filters[i]);
            if(selectorType.tagSelector===1){
                if(target.nodeName.toLowerCase()!==temp.toLowerCase()){
                    return;
                }
                listener.call(target,e);
            }else if(selectorType.idSelector===1){
                if(target.getAttribute("id")!==temp){
                    return;
                }
                listener.call(target,e);
            }else if(selectorType.classSelector===1){
                if(!hasClass(target, temp)){
                    return;
                }
                // if(target.getAttribute("className")!==temp){
                //     return;
                // }
                listener.call(target,e);
            }else if(selectorType.attrSelector===1){
                temp=temp.split("=");
                var key=temp[0],
                    val=temp.length>1?temp[1]:"";
                if(val&&val===target.getAttribute(key)){
                    listener.call(target,e);
                }else if(!val&&target.getAttribute(key)){
                    listener.call(target,e);
                }
                return;
            }
        }
    })
}

$.on = function(selector,eventName,listener){
	var element;
	if(typeof selector === 'string'){
		element = $(selector); 
	} else if(typeof selector === 'object'){
		element = selector;
	} 
	if(!element) return;
	addEvent(element,eventName,listener);
}

 $.un = function(selector, event, listener){
 	var element;
 	if(typeof selector === 'string'){
		element = $(selector); 
	} else if(typeof selector === 'object'){
		element = selector;
	} 
	if(!element) return;
	removeEvent(element,event,listener);
 }

 $.click=function (selector,listener) {
    var element;
    if(typeof selector ==="string"){
        element=$(selector);
    }else if(typeof selector ==="object"){
        element=selector;
    }
    if(!element) return;
    addClickEvent(element,listener);
};

$.enter=function (selector,listener) {
    var element;
    if(typeof selector ==="string"){
        element=$(selector);
    }else if(typeof selector ==="object"){
        element=selector;
    }
    if(!element) return;
    addEnterEvent(element,listener);
};
$.delegate=delegateEvent;

function isIE() {
    var userAgent=navigator.userAgent.toLowerCase();
    var matchs=/trident\/([\d+\.]+)/.exec(userAgent);
    if(matchs&&matchs.length>0){
        return matchs[1];
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var res="";
    if(!cookieName||!cookieValue) return;
    res+=encodeURIComponent(cookieName)+encodeURIComponent(cookieValue);
    if(expiredays instanceof Date){
        res+="; expires="+expiredays.toGMTString();
    }
    document.cookie=res;
}

// 获取cookie值
function getCookie(cookieName) {
    var cookie=document.cookie;
    cookieName=encodeURIComponent(cookieName);
    var start=cookie.indexOf(cookieName),
        val=null;
    if(start>-1){
        var end=cookie.indexOf(";",start);
        if(end===-1){
            end=cookie.length;
        }
        val=decodeURIComponent(cookie.substring(start+cookieName.length+1,end));
    }
    return val;
}

// ajax
function ajax (url,options) {
    if(typeof url !=="string") return;

    if(!ajax.getXHR){
        ajax.getXHR=function () {
           if(window.XMLHttpRequest){
                return function () {
                    return new XMLHttpRequest();
                }
           }else if(window.ActiveXObject){
               return function () {
                   return new ActiveXObject("Microsoft.XMLHTTP");
               }
           }else{
               return function () {
                   console.log("你的浏览器不支持ajax");
                   return null;
               }
           } 
        }();
    }
    var xhr=ajax.getXHR();
    if(!xhr) return;

    var defOpts={
        type:"get",
        data:null,
        onsuccess:function(){},
        onfail:function(){}
    };
    for(var prop in defOpts){
        if(prop.hasOwnProperty(prop)){
            if(typeof options[prop] ==="undefined"){
                options[prop]=defOpts[prop];
            }
        }
    }

    // 数据处理
    var encode=function (uploadData) {
        if(typeof uploadData ==="string")
            return uploadData;
        var res=[];
        for(var prop in uploadData){
            var temp=encodeURIComponent(prop)+"="+encodeURIComponent(uploadData[prop]);
            res.push(temp);
        }
        return res.join("&");
    }
    if(options.data){
        options.data=encode(options.data);
    }

    var get=function () {
        xhr.onreadystatechange=function () {
            if(xhr.readyState===4){
                if(xhr.status===200||xhr.status===304){
                    options.onsuccess(xhr.responseText);
                }else{
                    options.onfail();
                }
            }
        };
        xhr.open("get",options.data?(url+="?"+options.data):url);
        xhr.send(null);
    };

    var post=function () {
        xhr.onreadystatechange=function () {
            if(xhr.readyState===4){
                if(xhr.status===200||xhr.status===304){
                    options.onsuccess(xhr.responseText);
                }else{
                    options.onfail(xhr);
                }
            }
        };
        xhr.open("post",url);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xhr.send(options.data);
    };

    if(options.type==="get"){
        get();
    }else if(options.type==="post"){
        post();
    }
}

// 扩展对象
function extend(oldObj,tarObj) {
    var res=cloneObject(tarObj);
    for(var prop in oldObj){
        if(oldObj.hasOwnProperty(prop)){
            if(typeof tarObj[prop] === "undefined"){
                res[prop]=oldObj[prop];
            }
        }
    }
    return res;
};

$.extend=function (oldObj,tarObj) {
    var temp=cloneObject(tarObj);
    for(var prop in temp){
        if(temp.hasOwnProperty(prop)){
            oldObj[prop]=temp[prop];
        }
    }
};








