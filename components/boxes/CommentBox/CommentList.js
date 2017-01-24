import React from 'react';

import CommentItemContainer from './CommentItemContainer';

const FOLD_COMMENT_LIMIT = 1;

/*
  props
  - id
  - isChild
  - loadComments
  - modifyFoldComments
  - writeComment
  - editComment
  - deleteComment
  - commentsInfo
  - renderRecommendBox
*/
const CommentList = React.createClass({
  loadComments(id) {
    this.props.loadComments(id);
  },

  foldComments(id) {
    this.props.modifyFoldComments(id, true, this.props.isChild);
  },

  unfoldComments(id) {
    this.props.modifyFoldComments(id, false, this.props.isChild);
  },

  // TODO: 근본적인 해결 하기
  componentDidMount() {
    // this.foldComments(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id) {
      // this.foldComments(props.id);
    }
  },

  handleClickShowMore() {
    if (!this.props.commentsInfo.loaded[this.props.id]) {
      this.loadComments(this.props.id);
    }
    this.unfoldComments(this.props.id);
  },

  renderComment(comment) {
    const recommendBox = this.props.renderRecommendBox(comment);
    return (
      <CommentItemContainer
        writer={comment.writer.id}
        comment={comment}
        key={comment.id}
        id={this.props.id}
        loadReplies={this.props.loadReplies}
        setLastComment={this.props.setLastComment}
        modifyFoldComments={this.props.modifyFoldComments}
        writeComment={this.props.writeComment}
        deleteComment={this.props.deleteComment}
        editComment={this.props.editComment}
        repliesInfo={this.props.repliesInfo}
        renderRecommendBox={this.props.renderRecommendBox}
        recommendBox={recommendBox}
        isChild={this.props.isChild}
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
      showMoreButton = <button className="comment-show-more-button" onClick={this.handleClickShowMore}>{commentsNum - commentsNumToShow}개 더 보기</button>;
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
