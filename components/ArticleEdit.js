import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../utils';
import MarkdownEditor from './MarkdownEditor';

const ArticleEdit = React.createClass({
  loadArticleFromServer() {
    const {articleId} = this.props.params;
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.loadDataFromServer(url).then(data => {
      const {title, content} = data;
      this.setState({title, content});
    }).catch(console.error);
  },

  getInitialState() {
    return {title: '', content: ''};
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

  handleEdit(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const content = this.state.content.trim();
    // TODO
    const userId = 1;
    this.submitEdit({title, content, currentUserId: userId});
    this.setState({title: '', content: ''});
    browserHistory.push('/');
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
          <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTitleChange}/><br/>
          <MarkdownEditor value={this.state.content} onChange={this.handleContentChange}/><br/>
          <input type="submit" value="수정"/>
        </form>
      </div>
    );
  }
});

export default ArticleEdit;
