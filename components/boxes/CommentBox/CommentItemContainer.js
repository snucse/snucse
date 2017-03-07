import React from 'react';
import {connect} from 'react-redux';

import CommentList from './CommentList';
import CommentFormContainer from './CommentFormContainer';
import CommentItem from './CommentItem';

const CommentItemContainer = React.createClass({

  propTypes: {
    id: React.PropTypes.number.isRequired,
    comment: React.PropTypes.object.isRequired,
    writer: React.PropTypes.number.isRequired,
    setLastComment: React.PropTypes.func,
    modifyFoldComments: React.PropTypes.func,
    deleteComment: React.PropTypes.func,
    editComment: React.PropTypes.func,
    recommendBox: React.PropTypes.element,
    isChild: React.PropTypes.bool,
    loadReplies: React.PropTypes.func,
    repliesInfo: React.PropTypes.object,
    writeComment: React.PropTypes.func,
    renderRecommendBox: React.PropTypes.func
  },

  componentDidMount() {
    if (!this.props.isChild) {
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
        isDeletable={mine}
        onDelete={this.handleDelete}
        isEditable={mine}
        onEdit={this.handleEdit}
        recommendBox={this.props.recommendBox}
        isChild={this.props.isChild}
        replyList={replyList}
        replyForm={replyForm}
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
