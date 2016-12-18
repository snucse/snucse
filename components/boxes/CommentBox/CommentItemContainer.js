import React from 'react';
import {connect} from 'react-redux';

import CommentList from './CommentList';
import CommentFormContainer from './CommentFormContainer';
import CommentItem from './CommentItem';

// fixme this is fake
const REPLY_INITIAL_STATE = {
  comments: {
    /*
    articleId: [
      {},
      {},
    ]
    */
  },
  count: {},
  loaded: {},
  fold: {}
};

/*
  props
  - comment
  - id
  - writeComment
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
    let replyList = null;
    let replyForm = null;
    if (!this.props.isChild) {
      replyList = <CommentList commentsInfo={REPLY_INITIAL_STATE} isChild/>;
      replyForm = (
        <CommentFormContainer
          id={this.props.id}
          parentCommentId={this.props.comment.id}
          writeComment={this.props.writeComment}
          />
      );
    }
    return (
      <CommentItem
        comment={this.props.comment}
        isEditable={mine}
        isDeletable={mine}
        isChild={this.props.isChild}
        replyList={replyList}
        replyForm={replyForm}
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
