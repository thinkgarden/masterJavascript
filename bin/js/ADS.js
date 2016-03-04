if(!String.repeat){
	String.prototype.repeat=function(l){
		return new Array(l+l).join(this);
	}
}

if(!String.trim){
	String.prototype.trim=function(){
		return this.replace(/^\s+|\s+$/g,'');
	}
}

(function(){
	if (!window.ADS) { window.ADS = {}; };

	window['ADS']['node'] = {
	    ELEMENT_NODE                : 1,
	    ATTRIBUTE_NODE              : 2,
	    TEXT_NODE                   : 3,
	    CDATA_SECTION_NODE          : 4,
	    ENTITY_REFERENCE_NODE       : 5,
	    ENTITY_NODE                 : 6,
	    PROCESSING_INSTRUCTION_NODE : 7,
	    COMMENT_NODE                : 8,
	    DOCUMENT_NODE               : 9,
	    DOCUMENT_TYPE_NODE          : 10,
	    DOCUMENT_FRAGMENT_NODE      : 11,
	    NOTATION_NODE               : 12
	};
	
	/**
	 * Walk the nodes in the DOM tree without maintaining parent/child relationships.
	 */
	function walkElementsLinear(func,node) {
	    var root = node || window.document;
	    var nodes = root.getElementsByTagName("*");
	    for(var i = 0 ; i < nodes.length ; i++) {
	        func.call(nodes[i]);
	    }
	};
	window['ADS']['walkElementsLinear'] = walkElementsLinear;

	/**
	 * Walk the nodes in the DOM tree maintaining parent/child relationships.
	 */
	function walkTheDOMRecursive(func,node,depth,returnedFromParent) {
	    var root = node || window.document;
	    returnedFromParent = func.call(root,depth++,returnedFromParent);
	    node = root.firstChild;
	    while(node) {
	        walkTheDOMRecursive(func,node,depth,returnedFromParent);
	        node = node.nextSibling;
	    }
	};
	window['ADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;

	/**
	 * Walk the nodes in the DOM tree maintaining parent/child relationships and include the node attributes as well.
	 */
	function walkTheDOMWithAttributes(node,func,depth,returnedFromParent) {
	    var root = node || window.document;
	    returnedFromParent = func(root,depth++,returnedFromParent);
	    if (root.attributes) {
	        for(var i=0; i < root.attributes.length; i++) {
	            walkTheDOMWithAttributes(root.attributes[i],func,depth-1,returnedFromParent);
	        }
	    }
	    if(root.nodeType != ADS.node.ATTRIBUTE_NODE) {
	        node = root.firstChild;
	        while(node) {
	            walkTheDOMWithAttributes(node,func,depth,returnedFromParent);
	            node = node.nextSibling;
	        }
	    }
	};
	window['ADS']['walkTheDOMWithAttributes'] = walkTheDOMWithAttributes;

	/**
	 * Walk the DOM recursively using a callback function
	 */
	function walkTheDOM(node, func) {
	    func(node);
	    node = node.firstChild;
	    while (node) {
	         walkTheDOM(node, func);
	         node = node.nextSibling;
	    }
	}
	window['ADS']['walkTheDOM'] = walkTheDOM;

	/**
	 * Convert hyphenated word-word strings to camel case wordWord strings.
	 */
	function camelize(s) {
	    return s.replace(/-(\w)/g, function (strMatch, p1){
	        return p1.toUpperCase();
	    });
	}
	window['ADS']['camelize'] = camelize;


	function getBrowserWindowSize(){
		var de = document.documentElement;
		return {
		 'width':(
				window.innerWidth 
				|| (de && de.clientWidth)
				|| document.body.clientWidth),
		 'height':(
		 		window.innerHeight
		 		|| (de && de.clientHeight)
		 		|| document.body.clientHeight)
		};

	};
	window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;

	function bindFunction(obj, func){
		return function(){
			func.apply(abj,arguments);
		};
	};
	window['ADS']['bindFunction'] = bindFunction;

	function isCompatiable(other){
		if(other===false 
			|| !Array.prototype.push
			|| !Object.hasOwnProperty
			|| !document.createElement
			|| !document.getElementsByTagName) {
			return false;
		} else {
			return true;
		}
	};
	window['ADS']['isCompatiable'] = isCompatiable;

	function $() {
		var elements = new Array();
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			//如果这个参数是一个字符串，那么就认为它是id
			if(typeof element == 'string'){
				element = document.getElementById(element);
			}
			//如果只提供一个参数,则立即返回元素
			if(arguments.length == 1){
				return element;
			}
			//否则将它们加入数组中
			elements.push(element);
		}
		return elements;
	};
	window['ADS']['$'] = $;

	function addEvent(node,type,listener){
		if(!isCompatiable()) {return false};
		if(!(node = $(node))) {return false};
		if(node.addEventListener){
			// w3c的方法
			node.addEventListener(type,listener,false);
			return true;
		} else if(node.attachEvent) {
			node['e'+type+listener] = listener;
			node[type+listener] = function(){
				node['e'+type+listener](window.event);
			}
			node.attachEvent('on'+type, node[type+listener]);
			return true;
		}
		return false;
	};
	window['ADS']['addEvent'] = addEvent;

	function removeEvent(node,type,listener) {
		if(!(node = $(node))) {return false};
		if(node.removeEventListener){
			node.removeEventListener(type,listener,false);
			return true;
		} else if(node.detachEvent) {
			node.detachEvent('on'+type,node[type+listener]);
			node[type+listener] = null;
			return true;
		}
		return false;

	 };
	window['ADS']['removeEvent'] = removeEvent;

	function getElementsByClassName(className,tag,parent) { 
		parent = parent || document;
		if(!(parent = $(parent))){
			return false;
		}
		var allTags = (tag == "*" && parent.all) ? parent.all :
		parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		className = className.replace(/\-/g,"\\-");
		// 匹配以className或空格+className开头的元素
		var regex = new Regex("(^|\\s)"+className+"\\s|$");
		var element;
		for (var i = 0; i < allTags.length; i++) {
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}
		return matchingElements;
	};
	window['ADS']['getElementsByClassName'] = getElementsByClassName;

	function toggleDisplay (node, value) { 
		if(!(node = $(node))) {return false};
		if(node.style.display != 'none'){
			node.style.display = 'none';
		} else{
			node.style.display = value || '';
		}
		return true;
	};
	window['ADS']['toggleDisplay'] = toggleDisplay;

	function insertAfter(node, referenceNode) { 
		if(!(node = $(node))) {return false};
		if(!(referenceNode = $(referenceNode))) {return false};
		return referenceNode.parentNode.insertBefore(
			node, referenceNode.nextSibling)
	};
	window['ADS']['insertAfter'] = insertAfter;

	function removeChildren(parent) { 
		if(!(node = $(node))) {return false};
		while(parent.firstChild){
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		return parent;
	};
	window['ADS']['removeChildren'] = removeChildren;

	function prependChild(parent, newNode) { 
		if(!(parent = $(parent))) {return false};
		if(!(newNode = $(newNode))) {return false};
		if(parent.firstChild){
			parent.insertBefore(newNode,parent.firstChild);
		} else{
			parent.appendChild(newNode);
		}
		return parent;
	};
	window['ADS']['prependChild'] = prependChild;

})();