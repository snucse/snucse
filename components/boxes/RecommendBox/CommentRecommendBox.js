import React from 'react';
import {connect} from 'react-redux';

import {recommendComment} from '../../../actions/dispatchers';
import RecommendBoxContainer from './RecommendBoxContainer';

const CommentRecommendBox = React.createClass({
  render() {
    return (
      <RecommendBoxContainer
        id={this.props.commentId}
        recommend={this.props.recommendComment}
        count={this.props.count}
        />
    );
  }
});

// map dispatch, prop
const mapDispatchToProps = function (dispatch) {
  return {
    recommendComment: id => recommendComment(dispatch, id)
  };
};

export default connect(null, mapDispatchToProps)(CommentRecommendBox);
