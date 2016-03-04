var React = require('react');
var classNames = require('classnames');
var Button = React.createClass({

	render: function() {
		var classes = classNames({
			button:true,
			pink:this.props.isPink,
			green:this.props.isGreen 
		});
		return (
			<a href="#" className={classes} >{this.props.text}</a>
		);
	}

});

module.exports = Button;