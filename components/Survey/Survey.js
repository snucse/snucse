import React from 'react';

/*
 * props
 * - surveyId
 */

const Survey = React.createClass({
  getInitialState() {
    return {
      opened: false
    };
  },

  render() {
    if (!this.state.opened) {
      return <div className="survey-container">설문조사가 있습니다.</div>;
    }

    return null;
  }
});

export default Survey;
