import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {loadSurvey} from '../../actions/dispatchers';
import VoteForm from './VoteForm';
import SurveyResult from './SurveyResult';

/*
 * props
 * - surveyId
 */

const Survey = React.createClass({
  handleFolderClick() {
    this.props.loadSurvey(this.props.surveyId);
  },

  getInitialState() {
    return {
      voting: true
    };
  },

  handleVoteClick() {
    this.setState({voting: true});
  },

  handleShowResultClick() {
    this.setState({voting: false});
  },

  render() {
    if (!this.props.opened) {
      return <div className="survey-container" onClick={this.handleFolderClick}>설문조사가 있습니다. 클릭해서 확인해주세요.</div>;
    }

    moment.locale('ko');

    const {title, startTime, endTime, anonymous, voted, content} = this.props.survey;
    const {timestamp} = this.props;
    const surveyInterval = startTime ? (
      `${moment(startTime).format('LL LTS')}부터 ${moment(endTime).format('LL LTS')}까지`
    ) : (
      `${moment(endTime).format('LL LTS')}까지`
    );
    const surveyAnonymous = anonymous ? '익명 설문입니다.' : '익명 설문이 아닙니다.';
    const canVote = !voted && moment(endTime).isAfter(timestamp);
    const canShowResult = content[0].count;
    // TODO: showResultType 조회가 가능해지면 수정
    /*
    const surveyType = {
      voter: '응답자에게만 공개',
      public: '전체 공개',
      finish: '설문 종료 후 공개'
    }[type];
    */

    const isVoting = this.state.voting && canVote;
    const surveyContent = isVoting ? (
      <VoteForm surveyId={this.props.surveyId} content={content}/>
    ) : (
      <SurveyResult content={content}/>
    );

    const surveyButtons = [];
    if (canVote && !isVoting) {
      surveyButtons.push(
        <button type="button" onClick={this.handleVoteClick} key="VOTE_BUTTON">
          투표하기
        </button>
      );
    }
    if (canShowResult && isVoting) {
      surveyButtons.push(
        <button type="button" onClick={this.handleShowResultClick} key="SHOW_RESULT_BUTTON">
          결과 보기
        </button>
      );
    }

    return (
      <div className="survey-container">
        <div className="survey-voted">{voted ? '이미 응답한 설문입니다.' : '아직 응답하지 않은 설문입니다.'}</div>
        <div className="survey-title">{`제목: ${title}`}</div>
        <div className="survey-interval">{`설문조사 기간: ${surveyInterval}`}</div>
        <div className="survey-anonymous">{`익명 설문: ${surveyAnonymous}`}</div>
        <div className="survey-content">{surveyContent}</div>
        <div className="survey-buttons">{surveyButtons}</div>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  const {opened, survey} = state.survey;
  const {timestamp} = state.realtime;
  return {opened, survey, timestamp};
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadSurvey: surveyId => loadSurvey(dispatch, surveyId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
