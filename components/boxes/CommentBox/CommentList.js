import React from 'react';

import CommentItemContainer from './CommentItemContainer';

const FOLD_COMMENT_LIMIT = 1;

const CommentList = React.createClass({

  propTypes: {
    id: React.PropTypes.number,
    loadComments: React.PropTypes.func,
    loadReplies: React.PropTypes.func,
    setLastComment: React.PropTypes.func,
    modifyFoldComments: React.PropTypes.func,
    writeComment: React.PropTypes.func,
    deleteComment: React.PropTypes.func,
    editComment: React.PropTypes.func,
    commentsInfo: React.PropTypes.object,
    repliesInfo: React.PropTypes.object,
    renderRecommendBox: React.PropTypes.func,
    isChild: React.PropTypes.bool
  },

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
        id={this.props.id}
        comment={comment}
        writer={comment.writer.id}
        loadReplies={this.props.loadReplies}
        setLastComment={this.props.setLastComment}
        modifyFoldComments={this.props.modifyFoldComments}
        deleteComment={this.props.deleteComment}
        editComment={this.props.editComment}
        recommendBox={recommendBox}
        isChild={this.props.isChild}
        repliesInfo={this.props.repliesInfo}
        writeComment={this.props.writeComment}
        renderRecommendBox={this.props.renderRecommendBox}
        key={comment.id}
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
      <div className="comment-list-container">
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
