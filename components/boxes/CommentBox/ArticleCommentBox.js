import React from 'react';
import {connect} from 'react-redux';

import {loadComments, loadReplies, setLastComment, writeComment, modifyFoldComments, editComment, deleteComment} from '../../../actions/dispatchers';
import {CommentRecommendBox} from '../';
import CommentBox from './CommentBox';

const ArticleCommentBox = React.createClass({

  propTypes: {
    articleId: React.PropTypes.number.isRequired,
    lastComment: React.PropTypes.object,
    commentCount: React.PropTypes.number,
    isAddable: React.PropTypes.bool
  },

  renderRecommendBox(comment) {
    return <CommentRecommendBox commentId={comment.id} count={comment.recommendationCount}/>;
  },

  render() {
    return (
      <CommentBox
        id={this.props.articleId}
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
    commentsInfo: state.comment.article,
    repliesInfo: state.comment.articleReply
  };
};

const mapDispatcherToProps = function (dispatch) {
  return {
    loadComments: id => loadComments(dispatch, id),
    loadReplies: id => loadReplies(dispatch, id),
    setLastComment: (...args) => setLastComment(dispatch, ...args),
    writeComment: (targetId, content, parentCommentId) => writeComment(dispatch, targetId, content, parentCommentId),
    modifyFoldComments: (id, fold, isChild) => modifyFoldComments(dispatch, id, fold, isChild),
    editComment: (commentId, targetId, newContent, isChild) => editComment(dispatch, commentId, targetId, newContent, isChild),
    deleteComment: (commentId, targetId, isChild) => deleteComment(dispatch, commentId, targetId, isChild)
  };
};

export default connect(mapStateToProps, mapDispatcherToProps)(ArticleCommentBox);
