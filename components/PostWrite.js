import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon} from '../utils';

const PostWrite = React.createClass({
  handlePostSubmit(data) {
    const url = this.props.route.url;
    DataCon.postDataToServer(url, 'POST', data);
  },

  render() {
    const {id} = this.props.params;
    return (
      <div className="postBox">
        <h3>글쓰기</h3>
        <PostForm onPostSubmit={this.handlePostSubmit} id={id}/>
      </div>
    );
  }
});

const PostForm = React.createClass({
  getInitialState() {
    return {title: '', content: ''};
  },
  handleContentChange(e) {
    this.setState({content: e.target.value});
  },
  handleTitleChange(e) {
    this.setState({title: e.target.value});
  },

  handleSubmit(e) {
    e.preventDefault();
    if (!confirm('전송하시겠습니까?')) {
      return;
    }
    // const currentUserId = 1;
    const profileId = this.props.id;
    const content = this.state.content.trim();
    const title = this.state.title.trim();
    if (!content || !title) {
      return;
    }
    this.props.onPostSubmit({title, content, profileIds: profileId});
    browserHistory.push(`/${profileId}`);
  },

  render() {
    return (
      <div className="commentForm">
        <form name="post" onSubmit={this.handleSubmit}>
          Title: <input type="text" id="title" name="title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange}/><br/>
          Content: <textarea rows="4" id="content" name="content" placeholder="Say something..." value={this.state.content} onChange={this.handleContentChange}/><br/>
          <button type="submit">글쓰기</button>
        </form>
      </div>
    );
  }
});

export default PostWrite;
