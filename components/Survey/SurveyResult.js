import React from 'react';
import {PieChart, Pie} from 'recharts';

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
      // TODO: 투표자 수가 서버에서 제공되면 수정하기
      const voteCount = question.count.reduce((sum, elt) => sum + elt);
      const choices = question.choices.map((choice, choiceIndex) => ({
        choice,
        choiceIndex,
        count: question.count[choiceIndex]
      })).sort((elt1, elt2) => (elt2.count - elt1.count))
      .map((elt, eltIndex) => (
        <li key={`choice-${elt.choiceIndex}`}>
          <div className="survey-result-choice">{`답변 ${eltIndex}. ${elt.choice}`}</div>
          <div className="survey-result-choice-count">
            {`${elt.count}표 (${voteCount ? 100 * elt.count / voteCount : 0}%)`}
          </div>
        </li>
      ));
      const pieData = voteCount ? (question.choices.map((choice, choiceIndex) => ({
        name: choice,
        value: question.count[choiceIndex]
      }))) : null;
      const pieChart = pieData ? (
        <PieChart
          width={300}
          height={300}
          >
          <Pie data={pieData} isAnimationActive={false} label/>
        </PieChart>
      ) : null;

      return (
        <li key={`question-${questionIndex}`}>
          <h3 className="survey-result-question">{`질문 ${questionIndex}. ${question.question}`}</h3>
          {pieChart}
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
