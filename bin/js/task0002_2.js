/**
 * 倒计时开发思路
 * 1、用户输入验证
 * 2、封装getDate(arr)函数将用户输入转换成对应的时间new Date(year,month,day)
 * 3、封装获取倒计时函数getRemainTime(curDate,finalDate)
 * 4、初始化检测，清除相关函数timer，设置间隔，开始
 * 
 */

(function(){
		
	var dayRadix=1000*60*60*24,
	        hourRadix=1000*60*60,
	        minuteRadix=1000*60,
	        secondRadix=1000;

	var timer=null,
	    remainTimeDom=$("#reaminDate");

	var getTipStr=function(remainTime,finalDate){
		var tipStr = "距离"+finalDate.getFullYear()+"年"+(finalDate.getMonth()+1)+"月"+finalDate.getDate()+"日还有";
		tipStr+=remainTime.day+"天"+remainTime.hour+"时"+remainTime.minute+"分"+remainTime.second+"秒";
	    return tipStr;

	}
	
	var getDate=function (date) {
	    if(date.length!==3){
	        return false;
	    }
	    try{
	    	if(date[1].charAt(0)=='0'){
	    		date[1] = date[1].slice(1)
	    	}
	        date=new Date(date[0],date[1]-1,date[2]);
	        return date;
	    }catch(err){
	        return false;
	    }
	};

	var getRemainTime=function(date1,date2){
		var remain = date1 - date2;
		var days=Math.floor(remain/dayRadix);
		remain = remain%dayRadix;
		var hours=Math.floor(remain/hourRadix);
		remain = remain%hourRadix;
		var minutes=Math.floor(remain/minuteRadix);
		remain = remain%minuteRadix;
		var seconds=Math.floor(remain/secondRadix);
		return {
	        day:days,
	        hour:hours,
	        minute:minutes,
	        second:seconds
	    };
	}

	var start=function (finalDate) {
		// 开始前先清除
	    if(timer!==null){
	        clearInterval(timer);
	        timer=null;
	    }

	    run(finalDate);
	    // 每隔一秒中执行一次
	    timer=setInterval(function () {
	        run(finalDate);
	    },1000);
	};

	 var run=function (finalDate) {
	    var curDate=new Date();
	    // 如果时差为0，则倒计时停止
	    if(curDate >= finalDate){
	        clearInterval(timer);
	        timer=null;
	        remainTimeDom.innerHTML=getTipStr({day:0,hour:0,minute:0,second:0},finalDate);
	        return;
	    }
	    var remainTime=getRemainTime(curDate,finalDate);
	    remainTimeDom.innerHTML=getTipStr(remainTime,finalDate);
	};


	$.on($('#start'),'click',function(){
		// var regex = /\d{4}-\d{2}-\d{4}/g;
		var dateTxt = trim($('#inputDate').value);
		if(!dateTxt) return;
		// if(regex.test(dateTxt)){
		var date=getDate(dateTxt.split("-"));
		if(date instanceof Date){
	        var curDate=new Date();
	        if(curDate>date){
	            alert("你输入的时间已过期");
	            return;
	        }
	        start(date);
	    }
		// } else{
		// 	alert("请按照YYYY-MM-DD的格式输入日期");
		// 	return;
		// }

	});
})();
