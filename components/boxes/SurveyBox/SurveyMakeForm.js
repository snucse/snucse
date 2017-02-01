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
    return e => {
      this.props.onSurveyChange(inputName, e.target.value);
    };
  },

  handleCheckboxChange(inputName) {
    return e => {
      this.props.onSurveyChange(inputName, e.target.checked);
    };
  },

  handleQuestionChange(questionId, question) {
    const {survey} = this.props;
    this.props.onSurveyChange('content', {
      ...survey.content,
      [questionId]: question
    });
  },

  handleQuestionDelete(questionId) {
    const {survey} = this.props;
    const newContent = Object.keys(survey.content)
      .filter(oldQuestionId => oldQuestionId != questionId)
      .reduce((s, e) => {
        s[e] = survey.content[e];
        return s;
      }, {});
    this.props.onSurveyChange('content', newContent);
  },

  handleQuestionAdd() {
    const {survey} = this.props;
    const maxId = Object.keys(survey.content)
      .reduce((s, e) => Math.max(s, e), -1);
    this.props.onSurveyChange('content', {
      ...survey.content,
      [maxId + 1]: {
        question: '',
        type: 'select-one',
        choices: {}
      }
    });
  },

  render() {
    const {survey} = this.props;
    const startTimeForm = survey.hasStartTime ? (
      <div>
        <input className="survey-form-input" type="date" name="startDate" placeholder="1900-01-01" onChange={this.handleTextChange('startDate')}/>
        <input className="survey-form-input" type="time" step="1" name="startTime" placeholder="12:00:00" onChange={this.handleTextChange('startTime')}/>
      </div>
    ) : null;
    return (
      <div className="survey-make-form">
        <div>
          <label className="survey-make-form-label">제목</label>
          <input className="survey-make-form-input" type="text" name="title" onChange={this.handleTextChange('title')}/>
        </div>
        <div onChange={this.handleTextChange('showResultType')}>
          <label className="survey-make-form-label">결과 공개 범위</label>
          <input className="survey-make-form-input" type="radio" name="showResultType" value="public"/>전체 공개
          <input className="survey-make-form-input" type="radio" name="showResultType" value="voter"/>투표자에게 공개
          <input className="survey-make-form-input" type="radio" name="showResultType" value="finish"/>종료 후 공개
        </div>
        <div>
          <label className="survey-make-form-label">익명 설문조사</label>
          <input className="survey-make-form-input" type="checkbox" name="isAnonymous" onChange={this.handleCheckboxChange('isAnonymous')}/>익명
        </div>
        <div>
          <label className="survey-make-form-label">투표 시작 시각</label>
          <input className="survey-make-form-input" type="checkbox" name="hasStartTime" onChange={this.handleCheckboxChange('hasStartTime')}/>시작 시각 지정하기
          {startTimeForm}
        </div>
        <div>
          <label className="survey-make-form-label">투표 종료 시각</label>
          <input className="survey-make-form-input" type="date" name="endDate" placeholder="1900-01-01" onChange={this.handleTextChange('endDate')}/>
          <input className="survey-make-form-input" type="time" step="1" name="endTime" placeholder="12:00:00" onChange={this.handleTextChange('endTime')}/>
        </div>
        <div>
          <SurveyMakeQuestionForm
            onQuestionChange={this.handleQuestionChange}
            onQuestionDelete={this.handleQuestionDelete}
            onQuestionAdd={this.handleQuestionAdd}
            questions={survey.content}
            />
        </div>
      </div>
    );
  }
});

export default SurveyMakeForm;
