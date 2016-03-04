var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
	getInitialState() {
		console.log('init');
		return {
			color:'#1f88be',
			fontWight:500
		};
	},

	handleClick:function(event){
		var tipE = ReactDOM.findDOMNode(this.refs.tip);
		console.log(tipE); 
		if(tipE.style.display==='none'){
			tipE.style.display='inline';
		} else{
			tipE.style.display='none';
		}
		event.stopPropagation();
		event.preventDefault();
	},

	alert:function(){
		alert("没事干嘛点我！");
	},
	render: function() {
		return (
			<div>
				<h1> 你好世界</h1>
				<p style={this.state}>每次都是hello world 你Y烦不烦啊</p>
				<button onClick={this.handleClick}>显示|隐藏</button><span ref="tip">点击测试</span>
			</div>
		);
	},
	componentWillMount() {
		console.log('will');
	},
	componentDidMount() {
		console.log('did');
		window.setTimeout(function(){
			this.setState({
				color:'#b5cc18',
				fontWight:300
			});
		}.bind(this), 3000);
	},

});

module.exports = Hello;