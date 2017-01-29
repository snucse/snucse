import React from 'react';

const SurveyMakeChoiceDelBox = React.createClass({
  render() {
    return <button className="survey-choice-delete-button" type="button" name={this.props.choiceId} onCLick={this.props.onClick}>보기 삭제</button>;
  }
});

/*
 * props
 *  - onChoiceChange
 *  - onChoiceAdd
 *  - onChoiceDelete
 *  - id
 */

const SurveyMakeChoiceForm = React.createClass({
  getInitialState() {
    return {
      index: 0,
      choiceIds: []
    };
  },

  handleChange(e) {
    this.props.onChoiceChange(e.target.name, e.target.value);
  },

  handleClick(e) {
    const choiceId = Number(e.target.name);
    this.props.onChoiceDelete(choiceId);
    this.setState({
      choiceIds: this.state.choiceIds.filter(oldChoiceId => oldChoiceId !== choiceId)
    });
  },

  handleAdd() {
    this.setState({
      index: this.state.index + 1,
      choiceIds: this.state.choiceIds.concat(this.state.index)
    });
  },

  render() {
    const choiceForms = this.state.choiceIds.map(choiceId => {
      return (
        <div className="survey-make-choice-form" key={`${this.props.id}-${choiceId}`}>
          <input type="text" name={choiceId}/>
          <SurveyMakeChoiceDelBox choiceId={choiceId}/>
        </div>
      );
    });

    return (
      <div id="survey-make-choice-form-container">
        {choiceForms}
        <button id="survey-make-choice-add-button" type="button" onClick={this.handleAdd}>보기 추가</button>
      </div>
    );
  }
});

export default SurveyMakeChoiceForm;
