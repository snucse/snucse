import React from 'react';
import {connect} from 'react-redux';

import CommentItemContainer from './CommentItemContainer.js';

const FOLD_COMMENT_LIMIT = 1;

/*
  props
  - articleId
  - isFold

  states
  - isFold
    // 접혀 있으면 true, 펼쳐져 있으면 false, default는 true
*/
const CommentList = React.createClass({
  getInitialState() {
    return {
      isFold: this.props.isFold || true
    };
  },

  handleClickShowMore() {
    this.setState({isFold: false});
  },

  renderComment(comment) {
    return (
      <CommentItemContainer
        comment={comment}
        key={comment.id}
        articleId={this.props.articleId}
        />
    );
  },

  render() {
    const comments = this.props.comments[this.props.articleId] || [];
    const commentsNum = comments.length;
    let commentsNumToShow;
    if (this.state.isFold) {
      commentsNumToShow = FOLD_COMMENT_LIMIT;
    } else {
      commentsNumToShow = commentsNum;
    }
    const commentItems = comments.slice(Math.max(commentsNum - commentsNumToShow, 0), commentsNum)
        .map(this.renderComment);
    const showMoreButton = this.state.isFold && commentsNum > commentsNumToShow ?
      <button onClick={this.handleClickShowMore}>{commentsNum - commentsNumToShow}개 더 보기</button> :
      null;
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

const mapStateToProps = function (state) {
  return {
    comments: state.comment.comments
  };
};

export default connect(mapStateToProps)(CommentList);
