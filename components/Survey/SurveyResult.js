import React from 'react';

/*
 * props
 * - content: array of object
 *   - question
 *   - type
 *   - choices: array of string
 *   - count: array of Number
 */

const SurveyResult = React.createClass({
  render() {
    const {content} = this.props;
    const questions = content.map((question, questionIndex) => {
      const voteCount = question.count.reduce((sum, elt) => sum + elt);
      const choices = question.choices.map((choice, choiceIndex) => (
        <li key={`choice-${choiceIndex}`}>
          <div>{choice}</div>
          <div>{100 * question.count[choiceIndex] / voteCount}</div>
        </li>
      ));

      return (
        <li key={`question-${questionIndex}`}>
          <h4>{question.question}</h4>
          <ol className="survey-result-choices">
            {choices}
          </ol>
        </li>
      );
    });

    return (
      <div className="survey-result">
        <ol className="survey-result-questions">
          {questions}
        </ol>
      </div>
    );
  }
});

export default SurveyResult;
