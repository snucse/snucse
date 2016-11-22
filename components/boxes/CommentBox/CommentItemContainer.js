import React from 'react';
import {connect} from 'react-redux';

import {deleteComment, editComment} from '../../../actions/dispatchers';
import CommentItem from './CommentItem';

/*
  props
  - comment
  - articleId
*/
const CommentItemContainer = React.createClass({
  handleDelete() {
    this.props.deleteComment(this.props.comment.id, this.props.articleId);
  },

  handleEdit(newContent) {
    this.props.editComment(this.props.comment.id, this.props.articleId, newContent);
  },

  render() {
    const mine = (this.props.userId === this.props.writer);
    return (
      <CommentItem
        comment={this.props.comment}
        isEditable={mine}
        isDeletable={mine}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userId.userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    deleteComment: (commentId, articleId) => {
      deleteComment(dispatch, commentId, articleId);
    },
    editComment: (commentId, articleId, newContent) => {
      editComment(dispatch, commentId, articleId, newContent);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItemContainer);
