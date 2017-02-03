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
      // TODO: 결과 정렬하기
      const choices = question.choices.map((choice, choiceIndex) => (
        <li key={`choice-${choiceIndex}`}>
          <div className="survey-result-choice">{choice}</div>
          <div className="survey-result-choice-count">
            {`${question.count[choiceIndex]}표 (${voteCount ? 100 * question.count[choiceIndex] / voteCount : 0}%)`}
          </div>
        </li>
      ));

      return (
        <li key={`question-${questionIndex}`}>
          <h3 className="survey-result-question">{`${questionIndex}. ${question.question}`}</h3>
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
