import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../utils';
import Editor from './Editor';

import {FileBox, FileUploadBox} from './boxes';

import '../stylesheets/article-write.styl';

const ArticleEdit = React.createClass({
  loadArticleFromServer() {
    const {articleId} = this.props.params;
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.loadDataFromServer(Url.getUrl('/users/me')).then(data => {
      return data.id;
    }).then(userId => {
      DataCon.loadDataFromServer(url).then(data => {
        const writerId = data.writer.id;

        if (userId === writerId) {
          const {title, content, renderingMode, files} = data;

          const alives = {};
          for (let i = 0; i < files.length; i++) {
            alives[files[i].id] = true;
          }
          this.setState({valid: true, title, content, renderingMode, files, alives});
        } else {
          this.setState({valid: false});
        }
      }).catch(err => {
        throw err;
      });
    }).catch(console.error);
  },

  getInitialState() {
    return {
      title: '',
      content: '',
      renderingMode: 'text',
      files: [],
      alives: {},
      newFiles: {}
    };
  },

  componentDidMount() {
    this.loadArticleFromServer();
  },

  submitEdit(data) {
    const {articleId} = this.props.params;
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.postFormDataToServer(url, 'PUT', data)
      .catch(console.error);
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

  handleAliveChange(fileId) {
    this.setState({
      alives: {
        ...this.state.alives,
        [fileId]: !this.state.alives[fileId]
      }
    });
  },

  handleFileChange(fileId, newFile) {
    this.setState({
      newFiles: {
        ...this.state.newFiles,
        [fileId]: newFile
      }
    });
  },

  handleFileDelete(fileId) {
    const newFiles = {};
    for (const oldFileId in this.state.newFiles) {
      if (oldFileId != fileId) {
        newFiles[oldFileId] = this.state.files[oldFileId];
      }
    }
    this.setState({
      newFiles
    });
  },

  handleEdit(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const content = this.state.content.trim();
    const renderingMode = this.state.renderingMode;
    const fileIds = this.state.files.map(file => file.id)
      .filter(id => this.state.alives[id]);
    const files = [];

    for (const fileId in this.state.newFiles) {
      if (Object.hasOwnProperty.call(this.state.newFiles, fileId)) {
        files.push(this.state.newFiles[fileId]);
      }
    }
    this.submitEdit({
      title,
      content,
      renderingMode,
      fileIds,
      files
    });
    this.setState({title: '', content: '', renderingMode: 'text'});
    browserHistory.push('/');
  },

  render() {
    if (!('valid' in this.state)) {
      return <p>Loading...</p>;
    }

    if (this.state.valid === false) {
      return <p>권한이 없습니다.</p>;
    }

    return (
      <div id="article-edit-box">
        <h3 id="article-edit-box-title">글 수정</h3>
        <form id="article-edit-form" onSubmit={this.handleEdit}>
          <div className="form-group">
            <label className="write-form-label" htmlFor="article-edit-form-title-input">제목</label>
            <input id="article-edit-form-title-input" className="write-form-input" type="text" name="title" value={this.state.title} onChange={this.handleTitleChange}/>
          </div>
          <div className="form-group">
            <label className="write-form-label" htmlFor="article-edit-form-content-input">내용</label>
            <Editor mode={this.state.renderingMode} value={this.state.content} onChange={this.handleContentChange} onModeChange={this.handleModeChange}/>
          </div>
          <div className="form-group">
            <label className="write-form-label">파일</label>
            <div id="file-container">
              <FileBox files={this.state.files} alives={this.state.alives} editable onAliveChange={this.handleAliveChange}/>
              <FileUploadBox onFileChange={this.handleFileChange} onFileDelete={this.handleFileDelete}/>
            </div>
          </div>
          <div id="article-edit-button-wrapper">
            <button id="article-edit-button" type="submit">수정</button>
          </div>
        </form>
      </div>
    );
  }
});

export default ArticleEdit;
