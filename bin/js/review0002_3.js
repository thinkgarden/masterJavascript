(function(){
	var quene,
		defOpt={
			direction:true,// true:正序即left  false:反序即right
            isLoop:true,
            duration:400
		};
	function querySelectorAll(context,selector){
		if(typeof context.querySelectorAll() === 'function'){
			querySelectorAll(context,selector)
		} else{
			var temp = selector.replace(/[\.#]/g,"");
			return getElementsByClassName(context,temp);
		}
	}
	function Slide(opt){
		this.wrap=$(opt.wrapSelector);
		this.items=querySelectorAll(this.wrap,opt.itemSelector);
		// 是否循环
        this.isLoop=opt.isLoop;
        // 运动方向
        this.direction=opt.direction;
        // 时间间隔
        this.duration=opt.duration;
        // 元素长度
        this.itemWidth=opt.itemWidth;
        // 当前元素
        this.curItem=this.items[0];
        // 当前索引
        this.curIndex=0;
        addClass(this.curItem,"z-current");
        // 当前小圆圈
        this.curSqure=null;
        // 是否disabled
        this.isDisabled=!1;
        this.id="s"+Date.now()+Math.floor(Math.random()*100);
        this.timer=null;

        this.init();
	}

	Slide.prototype={
		constructor:Slide,
		init:function(){
			var that=this;

            that.createSqure();
            that.createEvent();
            for(var i=0,length=items.length; i<length;i++){
            	that.items[i].style[transition]="left .6s ease-out";
            }
            that.start();
		},
		start:function(){
			that = this;
			that.timer=setInterval(function(){
				that.run();
			},that.duration)
		},
		run:function(){

		},
		// 鼠标移到当前图片停止切换，移开继续切换
        createEvent:function () {
            var that=this;
            $.on(this.wrap,"mouseover",function (e) {
                that.pouse();
            });
            $.on(this.wrap,"mouseout",function (e) {
                that.start();
            });
        },
        createSqure:function() {
        	var that=this;
        	var ft=document.createElement('div');
        	for(var i=0,len=this.items.length; i<len;i++){
        		var squre=document.createElement('a');
        		squre.className='squre';
        		squre.setAttribute("theItemIndex",i);
        		ft.appendChild(squre);
        		if(i===0){
        			that.curSqure=squre;
        			addClass(that.curSqure,"z-current");
        		}
        	}
        	ft.className="ft";
            ft.style.width=len*25+"px";
        }
        getSiblingElement:function () {
            var that=this,
                isLoop=that.isLoop;
            var nextItem=getSiblingElement(that.curItem),
                nextItemIndex=that.curIndex+1,
                nextSqure=getSiblingElement(that.curSqure);

            if(!nextItem){
                if(isLoop){
                    nextItem=that.items[0];
                    nextItemIndex=0;
                    nextSqure=that.curSqure.parentNode.children[0];
                }else{
                    return null;
                }
            }

            return {
                nextItem:nextItem,
                nextItemIndex:nextItemIndex,
                nextSqure:nextSqure
            };
        }
	}

	exports.slidePlugin={
		slide:function(opt){
			if(!opt.itemSelector||!opt.wrapSelector) return;
			// 将defOpt中的内容扩展到opt
			opt=extend(defOpt,opt);

		}
	}

	widow.onload=function(){
		var id = slidePlugin.slide({
	        wrapSelector:".wrap",
	        itemSelector:".item",
	        duration:3000,
	        direction:true
	    });
	}

})()