import React from 'react';
import {connect} from 'react-redux';

import Editor from './Editor';
import {FileUploadBox, SurveyMakeForm} from './boxes';

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

const ArticleFormProto = React.createClass({
  getInitialState() {
    return {
      title: '',
      content: '',
      renderingMode: 'md',
      files: {}, // pairs of (fileId, file obj)
      hasSurvey: false,
      survey: {}
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
  handleProfileChange(e) {
    this.setState({
      id: e.target.value
    });
  },
  handleSurveyChange(key, value) {
    this.setState({
      survey: {
        ...this.state.survey,
        [key]: value
      }
    });
  },
  handleSurveyToggle() {
    this.setState({
      hasSurvey: !this.state.hasSurvey
    });
  },

  handleSubmit(e) {
    e.preventDefault();
    const profileId = this.state.id ? this.state.id : this.props.id;
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
    const profileSelector = this.props.id ? null : (
      <div className="form-group">
        <label className="write-form-label" htmlFor="article-write-form-profiles-input">프로필</label>
        <select id="article-write-form-profiles-input" className="write-form-input" defaultValue="" onChange={this.handleProfileChange}>
          <option value="" disabled>-- 프로필 선택 --</option>
          {this.props.following.map(profile => (
            <option value={profile.id} key={profile.id}>{profile.name}</option>
          ))}
        </select>
      </div>
    );

    const surveyMakeForm = this.state.hasSurvey ? (
      <SurveyMakeForm
        onSurveyChange={this.handleSurveyChange}
        survey={this.state.survey}
        />
      ) : null;

    return (
      <form id="article-write-form" onSubmit={this.handleSubmit}>
        {profileSelector}
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
        <div className="form-group">
          <label className="write-form-label">설문조사</label>
          <button type="button" onClick={this.handleSurveyToggle}>
            {this.state.hasSurvey ? '설문조사 제거' : '설문조사 추가'}
          </button>
          {surveyMakeForm}
        </div>
        <div id="article-write-button-wrapper">
          <button id="article-write-button" type="submit">글쓰기</button>
        </div>
      </form>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    following: state.me.following
  };
};

const ArticleForm = connect(mapStateToProps)(ArticleFormProto);

export default ArticleWrite;
