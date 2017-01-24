import React from 'react';
import {connect} from 'react-redux';

import CommentList from './CommentList';
import CommentFormContainer from './CommentFormContainer';
import CommentItem from './CommentItem';

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
  componentDidMount() {
    if (!this.props.isChild && this.props.comment.lastReply !== undefined) {
      this.props.setLastComment(this.props.comment.id, this.props.comment.lastReply, this.props.comment.replyCount, true);
    }
  },

  handleDelete() {
    this.props.deleteComment(this.props.comment.id, this.props.id, this.props.isChild);
  },

  handleEdit(newContent) {
    this.props.editComment(this.props.comment.id, this.props.id, newContent, this.props.isChild);
  },

  render() {
    const mine = (this.props.userId === this.props.writer);
    let replyList = null;
    let replyForm = null;
    if (!this.props.isChild) {
      replyList = (
        <CommentList
          id={this.props.comment.id}
          loadComments={this.props.loadReplies}
          modifyFoldComments={this.props.modifyFoldComments}
          writeComment={this.props.writeComment}
          deleteComment={this.props.deleteComment}
          editComment={this.props.editComment}
          commentsInfo={this.props.repliesInfo}
          renderRecommendBox={this.props.renderRecommendBox}
          isChild
          />
      );
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
