import React from 'react';
import {connect} from 'react-redux';

import {loadProfileComments, setLastProfileComment, writeProfileComment, modifyFoldProfileComments, editProfileComment, deleteProfileComment} from '../../../actions/dispatchers';
import {ProfileCommentRecommendBox} from '../';
import CommentBox from './CommentBox';

const ProfileCommentBox = React.createClass({
  renderRecommendBox(comment) {
    return <ProfileCommentRecommendBox commentId={comment.id} count={comment.recommendationCount}/>;
  },

  render() {
    return (
      <CommentBox
        id={this.props.profileId}
        lastComment={this.props.lastComment}
        commentCount={this.props.commentCount}
        isAddable={this.props.isAddable}
        loadComments={this.props.loadComments}
        setLastComment={this.props.setLastComment}
        writeComment={this.props.writeComment}
        modifyFoldComments={this.props.modifyFoldComments}
        commentsInfo={this.props.commentsInfo}
        editComment={this.props.editComment}
        deleteComment={this.props.deleteComment}
        renderRecommendBox={this.renderRecommendBox}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    commentsInfo: state.comment.profile
  };
};

const mapDispatcherToProps = function (dispatch) {
  return {
    loadComments: id => loadProfileComments(dispatch, id),
    setLastComment: (...args) => setLastProfileComment(dispatch, ...args),
    writeComment: (targetId, content) => writeProfileComment(dispatch, targetId, content),
    modifyFoldComments: (id, fold) => modifyFoldProfileComments(dispatch, id, fold),
    deleteComment: (commentId, targetId) => deleteProfileComment(dispatch, commentId, targetId),
    editComment: (commentId, targetId, newContent) => editProfileComment(dispatch, commentId, targetId, newContent)
  };
};

export default connect(mapStateToProps, mapDispatcherToProps)(ProfileCommentBox);
