import React from 'react';

import Editor from './Editor';
import {FileUploadBox} from './boxes';

import '../stylesheets/article-write.styl';

/*
 * props
 * - onArticleSubmit
 * - id
 */
const ArticleWrite = React.createClass({
  getInitialState() {
    return {index: 0};
  },

  handleArticleSubmit(data) {
    this.props.onArticleSubmit(data);
    this.setState({index: this.state.index + 1});
  },

  render() {
    const {id} = this.props;
    return (
      <div id="article-write-box">
        <h3 id="article-write-box-title">글쓰기</h3>
        <ArticleForm onArticleSubmit={this.handleArticleSubmit} id={id} key={this.state.index}/>
      </div>
    );
  }
});

const ArticleForm = React.createClass({
  getInitialState() {
    return {
      title: '',
      content: '',
      renderingMode: 'md',
      files: {} // pairs of (fileId, file obj)
    };
  },

  handleContentChange(value) {
    this.setState({content: value});
  },
  handleModeChange(renderingMode) {
    this.setState({renderingMode});
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
    const profileId = this.props.id;
    const content = this.state.content.trim();
    const title = this.state.title.trim();
    const renderingMode = this.state.renderingMode;
    const files = [];
    for (const fileId in this.state.files) {
      if (Object.hasOwnProperty.call(this.state.files, fileId)) {
        files.push(this.state.files[fileId]);
      }
    }
    if (!content || !title) {
      return;
    }

    this.props.onArticleSubmit({title, content, renderingMode, profileIds: profileId, files});
  },

  render() {
    return (
      <form id="article-write-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="write-form-label" htmlFor="article-write-form-title-input">제목</label>
          <input id="article-write-form-title-input" className="write-form-input" type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
        </div>
        <div className="form-group">
          <label className="write-form-label" htmlFor="article-write-form-content-input">내용</label>
          <Editor onChange={this.handleContentChange} onModeChange={this.handleModeChange}/>
        </div>
        <div className="form-group">
          <label className="write-form-label">파일</label>
          <div id="file-container">
            <FileUploadBox id={this.props.id} onFileChange={this.handleFileChange} onFileDelete={this.handleFileDelete}/>
          </div>
        </div>
        <div id="article-write-button-wrapper">
          <button id="article-write-button" type="submit">글쓰기</button>
        </div>
      </form>
    );
  }
});

export default ArticleWrite;
