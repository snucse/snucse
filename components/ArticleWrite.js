import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../utils';

import {FileUploadBox} from './boxes';

const ArticleWrite = React.createClass({
  handleArticleSubmit(data) {
    const url = Url.getUrl('/articles');
    DataCon.postFormDataToServer(url, 'POST', data)
      .catch(console.error);
  },

  render() {
    const {id} = this.props.params;
    return (
      <div className="article-box">
        <h3>글쓰기</h3>
        <ArticleForm onArticleSubmit={this.handleArticleSubmit} id={id}/>
      </div>
    );
  }
});

const ArticleForm = React.createClass({
  getInitialState() {
    return {
      title: '',
      content: '',
      files: {} // pairs of (fileId, file obj)
    };
  },

  handleContentChange(e) {
    this.setState({content: e.target.value});
  },
  handleTitleChange(e) {
    this.setState({title: e.target.value});
  },
  handleFileChange(fileId, newFile) {
    this.setState({
      files: {
        ...this.state.files,
        [fileId]: newFile
      }
    });
  },
  handleFileDelete(fileId) {
    const newFiles = {};
    for (const oldFileId in this.state.files) {
      if (oldFileId != fileId) {
        newFiles[oldFileId] = this.state.files[oldFileId];
      }
    }
    this.setState({
      files: newFiles
    });
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
    const files = [];
    for (const fileId in this.state.files) {
      if (Object.hasOwnProperty.call(this.state.files, fileId)) {
        files.push(this.state.files[fileId]);
      }
    }
    if (!content || !title) {
      return;
    }
    this.props.onArticleSubmit({title, content, profileIds: profileId, files});
    browserHistory.push(`/${profileId}`);
  },

  render() {
    return (
      <div className="comment-form">
        <form name="article" onSubmit={this.handleSubmit}>
          Title: <input type="text" id="title" name="title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange}/><br/>
          Content: <textarea rows="4" id="content" name="content" placeholder="Say something..." value={this.state.content} onChange={this.handleContentChange}/><br/>
          Files: <FileUploadBox id={this.props.id} onFileChange={this.handleFileChange} onFileDelete={this.handleFileDelete}/><br/>
          <button type="submit">글쓰기</button>
        </form>
      </div>
    );
  }
});

export default ArticleWrite;
