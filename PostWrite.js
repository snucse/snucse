import React from 'react';
import $ from 'jquery';
import { Navigation, Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import DataCon from './Util.js';

var PostWrite = React.createClass({
  handlePostSubmit: function(data) {
    var url = this.props.route.url;
    DataCon.postDataToServer(url, data, 'POST');
  },

  render: function() {
    let {id} = this.props.params;
    return (
      <div className="postBox">
        <h3>글쓰기</h3>
        <PostForm onPostSubmit={this.handlePostSubmit} id={id}/>
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function() {
    return {title: '', content: ''};
  },
  handleContentChange: function(e) {
    this.setState({content: e.target.value});
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },

  handleSubmit: function(e) {
    var a = confirm("전송하시겠습니까?")
    if (!a) {
      alert("aa");
      return;
    };
    e.preventDefault();
    var current_user_id = 1;
    var profile_id = this.props.id;
    var content = this.state.content.trim();
    var title = this.state.title.trim();
    if (!content || !title) {
      return;
    }
    this.props.onPostSubmit({title: title, content: content, profile_ids: profile_id});
    browserHistory.push('/'+profile_id);
  },

  render: function() {
    return (
      <div className="commentForm">
        <form name="post" onSubmit={this.handleSubmit}>
          Title: <input type="text" id="title" name="title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange} /><br/>
          Content: <textarea rows="4" id="content" name="content" placeholder="Say something..." value={this.state.content} onChange={this.handleContentChange} /><br/>
          <button type="submit">글쓰기</button>
        </form>
      </div>
    );
  }
});

export default PostWrite;
