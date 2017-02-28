import React from 'react';
import {connect} from 'react-redux';

import {loadProfileComments, loadProfileCommentReplies, setLastProfileComment, writeProfileComment, modifyFoldProfileComments, editProfileComment, deleteProfileComment} from '../../../actions/dispatchers';
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
        loadReplies={this.props.loadReplies}
        setLastComment={this.props.setLastComment}
        writeComment={this.props.writeComment}
        modifyFoldComments={this.props.modifyFoldComments}
        editComment={this.props.editComment}
        deleteComment={this.props.deleteComment}

        commentsInfo={this.props.commentsInfo}
        repliesInfo={this.props.repliesInfo}

        renderRecommendBox={this.renderRecommendBox}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    commentsInfo: state.comment.profile,
    repliesInfo: state.comment.profileReply
  };
};

const mapDispatcherToProps = function (dispatch) {
  return {
    loadComments: id => loadProfileComments(dispatch, id),
    loadReplies: id => loadProfileCommentReplies(dispatch, id),
    setLastComment: (...args) => setLastProfileComment(dispatch, ...args),
    writeComment: (targetId, content, parentCommentId) => writeProfileComment(dispatch, targetId, content, parentCommentId),
    modifyFoldComments: (id, fold, isChild) => modifyFoldProfileComments(dispatch, id, fold, isChild),
    editComment: (commentId, targetId, newContent, isChild) => editProfileComment(dispatch, commentId, targetId, newContent, isChild),
    deleteComment: (commentId, targetId, isChild) => deleteProfileComment(dispatch, commentId, targetId, isChild)
  };
};

export default connect(mapStateToProps, mapDispatcherToProps)(ProfileCommentBox);
