import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../utils';
import Editor from './Editor';

const ArticleEdit = React.createClass({
  loadArticleFromServer() {
    const {articleId} = this.props.params;
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.loadDataFromServer(url).then(data => {
      const {title, content, renderingMode} = data;
      this.setState({title, content, renderingMode});
    }).catch(console.error);
  },

  getInitialState() {
    return {title: '', content: '', renderingMode: 'text'};
  },

  componentDidMount() {
    this.loadArticleFromServer();
  },

  submitEdit(data) {
    const {articleId} = this.props.params;
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.postDataToServer(url, 'PUT', data);
  },

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  },

  handleContentChange(value) {
    this.setState({content: value});
  },

  handleModeChange(renderingMode) {
    this.setState({renderingMode});
  },

  handleEdit(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const content = this.state.content.trim();
    const renderingMode = this.state.renderingMode;
    // TODO
    const userId = 1;
    this.submitEdit({title, content, renderingMode, currentUserId: userId});
    this.setState({title: '', content: '', renderingMode: 'text'});
    browserHistory.push('/');
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
          <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTitleChange}/><br/>
          <Editor mode={this.state.renderingMode} value={this.state.content} onChange={this.handleContentChange} onModeChange={this.handleModeChange}/><br/>
          <input type="submit" value="수정"/>
        </form>
      </div>
    );
  }
});

export default ArticleEdit;
