import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../utils';

import {FileBox} from './boxes';

const ArticleEdit = React.createClass({
  loadArticleFromServer() {
    const {articleId} = this.props.params;
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.loadDataFromServer(url).then(data => {
      const {title, content, files} = data;

      const alives = {};
      for (let i = 0; i < files.length; i++) {
        alives[files[i].id] = true;
      }
      this.setState({title, content, files, alives});
    }).catch(console.error);
  },

  getInitialState() {
    return {title: '', content: '', files: [], alives: {}};
  },

  componentDidMount() {
    this.loadArticleFromServer();
  },

  submitEdit(data) {
    const {articleId} = this.props.params;
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.postFormDataToServer(url, 'PUT', data);
  },

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  },

  handleContentChange(e) {
    this.setState({content: e.target.value});
  },

  handleAliveChange(fileId) {
    this.setState({
      alives: {
        ...this.state.alives,
        [fileId]: !this.state.alives[fileId]
      }
    });
  },

  handleEdit(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const content = this.state.content.trim();
    const fileIds = this.state.files.map(file => file.id)
      .filter(id => this.state.alives[id]);

    this.submitEdit({
      title,
      content,
      fileIds
    });
    this.setState({title: '', content: ''});
    browserHistory.push('/');
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
          <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
          <textarea rows="5" id="content" name="content" value={this.state.content} onChange={this.handleContentChange}/>
          <FileBox files={this.state.files} alives={this.state.alives} editable onAliveChange={this.handleAliveChange}/>
          <input type="submit" value="수정"/>
        </form>
      </div>
    );
  }
});

export default ArticleEdit;
