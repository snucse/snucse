import React from 'react';

const SurveyMakeChoiceDelBox = React.createClass({
  render() {
    return <button className="survey-make-choice-delete-button" type="button" name={this.props.choiceId} onClick={this.props.onClick}>보기 삭제</button>;
  }
});

/*
 * props
 *  - onChoiceChange
 *  - onChoiceDelete
 *  - onChoiceAdd
 *  - questionId
 *  - choices: map of (choiceId -> text)
 */

const SurveyMakeChoiceForm = React.createClass({
  handleChange(e) {
    const choiceId = Number(e.target.name);
    this.props.onChoiceChange(choiceId, e.target.value);
  },

  handleClick(e) {
    const choiceId = Number(e.target.name);
    this.props.onChoiceDelete(choiceId);
  },

  handleAdd() {
    this.props.onChoiceAdd();
  },

  render() {
    const {choices} = this.props;
    const choiceIds = [];
    for (const choiceId in choices) {
      if ({}.hasOwnProperty.call(choices, choiceId)) {
        choiceIds.push(choiceId);
      }
    }
    choiceIds.sort((i, j) => i - j);

    const choiceForms = choiceIds.map(choiceId => {
      return (
        <div className="survey-make-choice-form" key={`${this.props.questionId}-${choiceId}`}>
          <input type="text" name={choiceId} onChange={this.handleChange}/>
          <SurveyMakeChoiceDelBox choiceId={choiceId} onClick={this.handleClick}/>
        </div>
      );
    });

    return (
      <div className="survey-make-choice-form-container">
        {choiceForms}
        <button id="survey-make-choice-add-button" type="button" onClick={this.handleAdd}>보기 추가</button>
      </div>
    );
  }
});

export default SurveyMakeChoiceForm;
