import React from 'react';

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
 *    - content: map of (idx -> object)
 *      - question
 *      - type
 *      - choices: map of (idx -> string)
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
        <div onChange={handleTextChange('showResultType')}>
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
      </div>
    );
  }
});
