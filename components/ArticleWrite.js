import React from 'react';
import {connect} from 'react-redux';

import {connectModals} from '../utils';
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

  handleArticleSubmit(data, survey) {
    this.props.onArticleSubmit(data, survey);
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

const dateReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const timeReg = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

const ArticleFormProto = connectModals(React.createClass({
  getInitialState() {
    return {
      title: '',
      content: '',
      renderingMode: 'md',
      files: {}, // pairs of (fileId, file obj)
      hasSurvey: false,
      survey: {
        content: {}
      }
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

  validateSurvey() {
    const {survey} = this.state;
    const title = survey.title ? survey.title.trim() : undefined;
    if (!title) {
      this.props.alertModal('알림', '설문조사 제목을 입력해주세요.');
      return null;
    }

    if (!survey.showResultType) {
      this.props.alertModal('알림', '설문조사 결과 공개 범위를 설정해주세요.');
      return null;
    }

    if (survey.hasStartTime) {
      if (!(dateReg.test(survey.startDate)) || !(timeReg.test(survey.startTime))) {
        this.props.alertModal('알림', '설문조사 시작 시각을 올바르게 입력해주세요.');
        return null;
      }
    }

    if (!(dateReg.test(survey.endDate)) || !(timeReg.test(survey.endTime))) {
      this.props.alertModal('알림', '설문조사 종료 시각을 올바르게 입력해주세요.');
      return null;
    }

    const validQuestionIds = Object.keys(survey.content)
      .sort((i, j) => (i - j))
      .filter(questionId => {
        const {question, choices} = survey.content[questionId];
        return question.trim() && Object.keys(choices).some(choiceId => choices[choiceId].trim());
      });

    if (validQuestionIds.length === 0) {
      this.props.alertModal('알림', '설문조사에 올바른 질문 하나 이상을 추가해주세요.');
      return null;
    }

    const content = validQuestionIds.map(questionId => {
      const {question, type, choices} = survey.content[questionId];
      return {
        question,
        type,
        choices: Object.keys(choices)
          .sort((i, j) => (i - j))
          .filter(choiceId => choices[choiceId].trim())
          .map(choiceId => choices[choiceId].trim())
      };
    });

    const ret = {
      title,
      showResultType: survey.showResultType,
      isAnonymous: survey.isAnonymous ? 'true' : 'false',
      endTime: `${survey.endDate.substr(0, 4)}=${survey.endDate.substr(5)} ${survey.endTime}`, // TODO: 확인 후 수정
      content: JSON.stringify(content) // TODO: 확인 후 제거
    };
    if (survey.hasStartTime) {
      ret.startTime = `${survey.startDate.substr(0, 4)}=${survey.startDate.substr(5)} ${survey.startTime}`; // TODO: 확인 후 수정
    }
    return ret;
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

    const data = {title, content, renderingMode, profileIds: profileId, files};
    if (this.state.hasSurvey) {
      const survey = this.validateSurvey(this.state.survey);
      if (survey) {
        this.props.onArticleSubmit(data, survey);
      }
    } else {
      this.props.onArticleSubmit(data);
    }
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
          <label className="write-form-label">설문<br/>조사</label>
          <div id="survey-make-container">
            <button type="button" onClick={this.handleSurveyToggle}>
              {this.state.hasSurvey ? '설문조사 제거' : '설문조사 추가'}
            </button>
            {surveyMakeForm}
          </div>
        </div>
        <div id="article-write-button-wrapper">
          <button id="article-write-button" type="submit">글쓰기</button>
        </div>
      </form>
    );
  }
}));

const mapStateToProps = function (state) {
  return {
    following: state.me.following
  };
};

const ArticleForm = connect(mapStateToProps)(ArticleFormProto);

export default ArticleWrite;
