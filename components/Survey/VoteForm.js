import React from 'react';
import {connect} from 'react-redux';

import {connectModals, Url, DataCon} from '../../utils';
import {loadSurvey} from '../../actions/dispatchers';

/*
 * props
 * - onChange
 * - questionId
 * - question
 * - type
 * - choices: array of text
 */

const VoteQuestionForm = React.createClass({
  handleChange(choiceId) {
    return e => {
      this.props.onChange(choiceId, e.target.checked);
    };
  },

  render() {
    const {type, questionId, question} = this.props;
    const inputType = (type === 'select-one') ? 'radio' : 'checkbox';
    const choices = this.props.choices.map((choice, choiceId) => {
      const inputId = `${questionId}-${choiceId}`;
      return (
        <div className="vote-form-input" key={choiceId}>
          <input id={inputId} type={inputType} onChange={this.handleChange(choiceId)}/>
          <label htmlFor={inputId}>{choice}</label>
        </div>
      );
    });

    return (
      <div className="vote-form-question">
        <h5>{`${questionId}. ${question}`}</h5>
        {choices}
      </div>
    );
  }
});

/*
 * props
 * - surveyId
 * - content: array of object
 *   - question
 *   - type
 *   - choices: array of text
 */

const VoteForm = connectModals(React.createClass({
  handleChange(questionId) {
    return (choiceId, checked) => {
      const newChosen = new Set(this.state.chosen[questionId]);
      if (checked) {
        newChosen.add(choiceId);
      } else {
        newChosen.delete(choiceId);
      }
      this.setState({
        chosen: {
          ...this.state.chosen,
          [questionId]: newChosen
        }
      });
    };
  },

  getInitialState() {
    const chosen = this.props.content.reduce((sum, elt, idx) => {
      sum[idx] = new Set();
      return sum;
    }, {});
    return {chosen};
  },

  validateForm() {
    return Object.keys(this.state.chosen).every(elt => (this.state.chosen[elt].size > 0));
  },

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateForm()) {
      this.props.alertModal('알림', '선택하지 않은 설문조사 항목이 있습니다.');
      return;
    }

    const content = Object.keys(this.state.chosen)
      .sort((i, j) => i - j)
      .map(chosenSet => Array.from(chosenSet).sort((i, j) => i - j).map(Number));

    const {surveyId} = this.props;
    const url = Url.getUrl(`/surveys/${surveyId}/vote`);
    DataCon.postDataToServer(url, 'POST', {content: JSON.stringify(content)})
      .then(() => this.props.loadServey(surveyId))
      .catch(console.error); // TODO: 시간 지난 설문, 이미 참여한 투표 등의 예외 처리
  },

  render() {
    const questions = this.props.content.map((question, questionId) => (
      <VoteQuestionForm
        key={questionId}
        question={question.question}
        type={question.type}
        choices={question.choices}
        questionId={questionId}
        onChange={this.handleChange(questionId)}
        />
    ));

    return (
      <form id="vote-form" onSubmit={this.handleSubmit}>
        <div className="vote-form-question-container">
          {questions}
        </div>
        <button id="vote-button" type="submit">응답 제출</button>
      </form>
    );
  }
}));

const mapDispatchToProps = function (dispatch) {
  return {
    loadSurvey: surveyId => loadSurvey(dispatch, surveyId)
  };
};

export default connect(null, mapDispatchToProps)(VoteForm);
