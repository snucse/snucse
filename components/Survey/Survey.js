import React from 'react';
import {connect} from 'react-redux';

import {loadSurvey} from '../../actions/dispatchers';

/*
 * props
 * - surveyId
 */

const Survey = React.createClass({
  handleFolderClick() {
    this.props.loadSurvey(this.props.surveyId);
  },

  render() {
    if (!this.props.opened) {
      return <div className="survey-container" onClick={this.handleFolderClick}>설문조사가 있습니다. 클릭해서 확인해주세요.</div>;
    }

    return null; // TODO: survey view 추가
  }
});

const mapStateToProps = function (state) {
  const {opened, survey} = state.survey;
  return {opened, survey};
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadSurvey: surveyId => loadSurvey(dispatch, surveyId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
