/* eslint camelcase: "off" */
import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon} from '../utils';

const PostEdit = React.createClass({
  loadPostFromServer() {
    const {postId} = this.props.params;
    const url = `${this.props.route.url}/${postId}`;
    DataCon.loadDataFromServer(url).then(data => {
      const {title, content} = data;
      this.setState({title, content});
    }).catch(console.error);
  },

  getInitialState() {
    return {title: '', content: ''};
  },

  componentDidMount() {
    this.loadPostFromServer();
  },

  submitEdit(data) {
    const {postId} = this.props.params;
    const url = `${this.props.route.url}/${postId}`;
    DataCon.postDataToServer(url, 'PUT', data);
  },

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  },

  handleContentChange(e) {
    this.setState({content: e.target.value});
  },

  handleEdit(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const content = this.state.content.trim();
    // TODO
    const userId = 1;
    this.submitEdit({title, content, current_user_id: userId});
    this.setState({title: '', content: ''});
    browserHistory.push('/');
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
          <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
          <textarea rows="5" id="content" name="content" value={this.state.content} onChange={this.handleContentChange}/>
          <input type="submit" value="수정"/>
        </form>
      </div>
    );
  }
});

export default PostEdit;
