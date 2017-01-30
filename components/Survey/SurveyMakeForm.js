import React from 'react';

import SurveyMakeQuestionForm from './SurveyMakeQuestionForm';

/*
 * props
 *  - onSurveyChange
 *  - survey
 *    - title
 *    - showResultType
 *    - isAnonymous
 *    - hasStartTime
 *    - startDate
 *    - startTime
 *    - endDate
 *    - endTime
 *    - content: map of (questionId -> object)
 *      - question
 *      - type
 *      - choices: map of (choiceId -> text)
 */

const SurveyMakeForm = React.createClass({
  handleTextChange(inputName) {
    return function (e) {
      this.props.onSurveyChange(inputName, e.target.value);
    };
  },

  handleCheckboxChange(inputName) {
    return function (e) {
      this.props.onSurveyChange(inputName, e.target.checked);
    };
  },

  handleQuestionChange(questionId, question) {
    const {survey} = this.props;
    this.props.onSurveyChange('content', {
      ...survey,
      content: {
        ...survey.content,
        [questionId]: question
      }
    });
  },

  handleQuestionDelete(questionId) {
    const {survey} = this.props;
    const newContent = {};
    for (const oldQuestionId in survey.content) {
      if ({}.hasOwnProperty.call(survey.content, oldQuestionId)) {
        if (oldQuestionId !== questionId) {
          newContent[oldQuestionId] = survey.content[oldQuestionId];
        }
      }
    }
    this.props.onSurveyChange('content', {
      ...survey,
      content: newContent
    });
  },

  handleQuestionAdd() {
    const {survey} = this.props;
    let maxId = -1;
    for (const questionId in survey.content) {
      if ({}.hasOwnProperty.call(survey.content, questionId)) {
        maxId = Math.max(maxId, questionId);
      }
    }
    this.props.onSurveyChange('content', {
      ...survey,
      content: {
        ...survey.content,
        [maxId + 1]: {
          question: '',
          type: 'select-one',
          choices: {}
        }
      }
    });
  },

  render() {
    const {survey} = this.props;
    const startTimeForm = survey.hasStartTime ? (
      <div>
        <input className="survey-form-input" type="date" name="startDate" placeholder="1900-01-01" value={survey.startDate} onChange={this.handleTextChange('startDate')}/>
        <input className="survey-form-input" type="time" step="1" name="startTime" placeholder="12:00:00" value={survey.startDate} onChange={this.handleTextChange('startTime')}/>
      </div>
    ) : null;
    return (
      <div className="survey-form">
        <div>
          <label className="survey-form-label">제목</label>
          <input className="survey-form-input" type="text" name="title" value={survey.title} onChange={this.handleTextChange('title')}/>
        </div>
        <div onChange={this.handleTextChange('showResultType')}>
          <label className="survey-form-label">결과 공개 범위</label>
          <input className="survey-form-input" type="radio" name="showResultType" value="public"/>전체 공개
          <input className="survey-form-input" type="radio" name="showResultType" value="voter"/>투표자에게 공개
          <input className="survey-form-input" type="radio" name="showResultType" value="finish"/>종료 후 공개
        </div>
        <div>
          <label className="survey-form-label">익명 설문조사</label>
          <input className="survey-form-input" type="checkbox" name="isAnonymous" checked={survey.isAnonymous}/>익명
        </div>
        <div>
          <label className="survey-form-label">투표 시작 시각</label>
          <input className="survey-form-input" type="checkbox" name="hasStartTime" checked={survey.hasStartTime}/>시작 시각 지정하기
          {startTimeForm}
        </div>
        <div>
          <label className="survey-form-label">투표 종료 시각</label>
          <input className="survey-form-input" type="date" name="endDate" placeholder="1900-01-01" value={survey.startDate} onChange={this.handleTextChange('startDate')}/>
          <input className="survey-form-input" type="time" step="1" name="endTime" placeholder="12:00:00" value={survey.startDate} onChange={this.handleTextChange('startTime')}/>
        </div>
        <div>
          <SurveyMakeQuestionForm
            onQuestionChange={this.handleQuestionChange}
            onQuestionDelete={this.handleQuestionDelete}
            onQuestionAdd={this.handleQuestionAdd}
            />
        </div>
      </div>
    );
  }
});

export default SurveyMakeForm;
