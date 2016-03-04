var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = require('./components/CommentBox.js');

ReactDOM.render(
	<CommentBox url="/api/comments" pollInterval={5000} /> , 
	document.getElementById('content')
);