import React from 'react';
import {connect} from 'react-redux';

import {loadComments, setLastComment, writeComment, modifyFoldComments, editComment, deleteComment} from '../../../actions/dispatchers';
import {CommentRecommendBox} from '../';
import CommentBox from './CommentBox';

const ArticleCommentBox = React.createClass({
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
    commentsInfo: state.comment.article
  };
};

const mapDispatcherToProps = function (dispatch) {
  return {
    loadComments: id => loadComments(dispatch, id),
    setLastComment: (...args) => setLastComment(dispatch, ...args),
    writeComment: (targetId, content) => writeComment(dispatch, targetId, content),
    modifyFoldComments: (id, fold) => modifyFoldComments(dispatch, id, fold),
    deleteComment: (commentId, targetId) => deleteComment(dispatch, commentId, targetId),
    editComment: (commentId, targetId, newContent) => editComment(dispatch, commentId, targetId, newContent)
  };
};

export default connect(mapStateToProps, mapDispatcherToProps)(ArticleCommentBox);
