import React from 'react';
import {connect} from 'react-redux';

import CommentItem from './CommentItem';

/*
  props
  - comment
  - id
  - deleteComment
  - editComment
  - recommendBox
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
        recommendBox={this.props.recommendBox}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userInfo.userId
  };
};

export default connect(mapStateToProps)(CommentItemContainer);
