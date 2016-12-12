import React from 'react';

import CommentItemContainer from './CommentItemContainer';

const FOLD_COMMENT_LIMIT = 1;

/*
  props
  - id
  - loadComments
  - modifyFoldComments
  - deleteComment
  - editComment
  - commentsInfo
*/
const CommentList = React.createClass({
  loadComments(id) {
    this.props.loadComments(id);
  },

  foldComments(id) {
    this.props.modifyFoldComments(id, true);
  },

  unfoldComments(id) {
    this.props.modifyFoldComments(id, false);
  },

  componentDidMount() {
    this.foldComments(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id) {
      this.foldComments(props.id);
    }
  },

  handleClickShowMore() {
    if (!this.props.commentsInfo.loaded[this.props.id]) {
      this.loadComments(this.props.id);
    }
    this.unfoldComments(this.props.id);
  },

  renderComment(comment) {
    return (
      <CommentItemContainer
        writer={comment.writer.id}
        comment={comment}
        key={comment.id}
        id={this.props.id}
        deleteComment={this.props.deleteComment}
        editComment={this.props.editComment}
        />
    );
  },

  render() {
    const comments = this.props.commentsInfo.comments[this.props.id] || [];
    const commentsNum = this.props.commentsInfo.count[this.props.id] || 0;
    const isFold = this.props.commentsInfo.fold[this.props.id];
    let commentsNumToShow;
    if (isFold) {
      commentsNumToShow = FOLD_COMMENT_LIMIT;
    } else {
      commentsNumToShow = commentsNum;
    }
    commentsNumToShow = Math.min(commentsNumToShow, comments.length);
    const commentItems = comments.slice(Math.max(comments.length - commentsNumToShow, 0), commentsNum)
      .map(this.renderComment);
    let showMoreButton = null;
    if ((!this.props.commentsInfo.loaded[this.props.id] || isFold) && commentsNum > commentsNumToShow) {
      showMoreButton = <button onClick={this.handleClickShowMore}>{commentsNum - commentsNumToShow}개 더 보기</button>;
    }
    return (
      <div>
        <div className="comment-list-controller">
          {showMoreButton}
        </div>
        <ul className="comment-list">
          {commentItems}
        </ul>
      </div>
    );
  }
});

export default CommentList;
