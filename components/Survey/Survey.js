import React from 'react';
import {connect} from 'react-redux';

import {loadSurvey} from '../../actions/dispatchers';

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

  handleFolderClick() {
    new Promise(resolve => {
      this.props.loadSurvey(this.props.surveyId);
      resolve();
    }).then(() => {
      this.setState({opened: true});
    }).catch(console.error);
  },

  render() {
    if (!this.state.opened) {
      return <div className="survey-container" onClick={this.handleFolderClick}>설문조사가 있습니다. 클릭해서 확인해주세요.</div>;
    }

    return null; // TODO: survey view 추가
  }
});

const mapStateToProps = function (state) {
  const {startTime, endTime, title, anonymous, voted, content} = state;
  return {startTime, endTime, title, anonymous, voted, content};
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadSurvey: surveyId => loadSurvey(dispatch, surveyId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
