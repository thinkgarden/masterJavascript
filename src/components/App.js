var React = require('react');

var Action = require('./Action.js');
var Haoduo = require('./Haoduo.js');
var Books = require('./Books.js');

var App = React.createClass({
	render:function(){
		return(
			<div>
				<Action />
				<Haoduo />
				<Books />
			</div>
		);
	}
});

module.exports = App;

