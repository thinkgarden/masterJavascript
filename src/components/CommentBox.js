var React = require('react');
var ReactDom = require('react-dom');

var CommentBox = React.createClass({

	getInitialState() {
		return {data:[]};
	},

	loadCommentsFromServer:function(){
		$.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},

	handleCommentSubmit: function(comment) {
		var comments = this.state.data;
		comment.id = Date.now();
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type:'POST',
      data:comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},

	render: function() {
		return (
			<div className="CommentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	},

	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},

});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function (comment){
			return (
				<Comment author={comment.author} key={comment.id}> {comment.text}</Comment>
			);
		});
		return (
			<div className="CommentList">
				{commentNodes}
			</div>
		)
	}
});

var CommentForm = React.createClass({
	handSubmit:function(e){
		e.preventDefault(); //来避免浏览器默认地提交表单
		console.log(this.refs.author);
		var author = this.refs.author.value.trim();
		var text = this.refs.text.value.trim();
		if(!author || !text){
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.refs.author.getDOMNode().value = "";
		this.refs.text.getDOMNode().value = "";
		return;

	},

	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handSubmit}>
				<input type="text" ref="author" placeholder="Your name"/>
				<input type="text" ref="text" placeholder="Say something..."/>
				<input type="submit" value="Post"/>
			</form>
		);
	}

});

var Comment = React.createClass({
	rawMarkup: function() {
	    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
	    return { __html: rawMarkup };
	},

	render: function(){
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}

});


module.exports = CommentBox;
