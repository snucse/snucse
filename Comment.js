import $ from 'jquery';
import React from 'react';


var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
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
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  Interval: null,

  componentDidMount: function() {
    this.loadCommentsFromServer();
    this.Interval = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  componentWillUnmount: function() {
    clearInterval(this.Interval);
  },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <div className="commentBox">
      <h3>Comments</h3>
      <CommentList data={this.state.data} url={this.props.url} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  handleCommentDelete: function(id) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: id,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentEdit: function(id) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: id,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var _this = this
    var commentNodes = this.props.data.map(function(comment) {
      return (
          <Comment author={comment.author} text={comment.text} id={comment.id} onCommentEdit={_this.handleCommentEdit} onCommentDelete={_this.handleCommentDelete} key={comment.id}>
          </Comment>
      );
    });

    return (
        <div className="commentList">
          {commentNodes}
        </div>
    );
  } 
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  
  handleSubmit: function(e) {
    var a = confirm("전송하시겠습니까?")
    if (!a) {
      return;
    };
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var todo = "post";
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text, todo: todo});
    this.setState({author: '', text: '', todo: ''});
  },

  render: function() {
    return (
        <div className="commentForm">
          <form className="commentForm form-horizontal" role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label for="author" className="col-lg-2 control-label">닉네임</label>
            <div className="col-lg-10">
            <input type="text" id="author" name="author" className="form-control" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
            </div>
            </div>
            <div className="form-group">
            <label for="text" className="col-lg-2 control-label">댓글</label>
            <div className="col-lg-10">
            <input type="text" id="text" name="text" className="form-control" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
            </div>
            </div>
            <div className="form-group">
            <div className="col-lg-offset-2 col-lg-10">
            <button type="submit" className="btn btn-default">등록</button>
            </div>
            </div>
          </form>
        </div>
    );
  }
});

var Comment = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },

  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup }; 
  },


  handleDelete: function(e) {
    var a = confirm("삭제하시겠습니까?")
    if (!a) {
      return;
    }
    e.preventDefault();
    var id = this.props.id.trim();
    var todo = "delete";
    this.props.onCommentDelete({id: id, todo: todo});
  },
  
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleEdit: function(e) {
    var a = confirm("수정하시겠습니까?")
    if (!a) {
      return;
    }
    e.preventDefault();
    var id = this.props.id.trim();
    var author = this.props.author.trim();
    var text = this.state.text.trim();
    var todo = "edit";
    this.props.onCommentEdit({id: id, author: author, text: text, todo: todo});
    this.setState({id: '', author: '', text: '', todo: ''});
  },


  render: function() {
    return (
      <div className="comment container">
      <pre>
        <h3 className="commentAuthor">
          {this.props.author}
        </h3>
        <div>
        {this.props.text}
        </div>
        <form className="commentEdit" onSubmit={this.handleEdit}>
          <input type="text" name="text" className="form-control" placeholder="To..?" value={this.state.text} onChange={this.handleTextChange} />
          <button type="submit" className="btn btn-default">수정</button>
        </form>
        <form className="commentDelete" onSubmit={this.handleDelete}>
          <button type="submit" className="btn btn-default">삭제</button>
        </form>
      </pre>
        </div>
      );
  }
});

export default CommentBox;
