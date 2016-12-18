import React from 'react';
import {connect} from 'react-redux';

import {recommendProfileComment} from '../../../actions/dispatchers';
import RecommendBoxContainer from './RecommendBoxContainer';

const ProfileCommentRecommendBox = React.createClass({
  render() {
    return (
      <RecommendBoxContainer
        id={this.props.commentId}
        recommend={this.props.recommendProfileComment}
        count={this.props.count}
        />
    );
  }
});

// map dispatch, prop
const mapDispatchToProps = function (dispatch) {
  return {
    recommendProfileComment: id => recommendProfileComment(dispatch, id)
  };
};

export default connect(null, mapDispatchToProps)(ProfileCommentRecommendBox);
