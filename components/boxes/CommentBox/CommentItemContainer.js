import React from 'react';
import {connect} from 'react-redux';

import CommentItem from './CommentItem';

/*
  props
  - comment
  - id
  - deleteComment
  - editComment
*/
const CommentItemContainer = React.createClass({
  handleDelete() {
    this.props.deleteComment(this.props.comment.id, this.props.id);
  },

  handleEdit(newContent) {
    this.props.editComment(this.props.comment.id, this.props.id, newContent);
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

export default connect(mapStateToProps)(CommentItemContainer);
