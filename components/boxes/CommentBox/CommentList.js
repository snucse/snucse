import React from 'react';
import {connect} from 'react-redux';

import {loadComments, unfoldComments} from '../../../actions/dispatchers';
import CommentItemContainer from './CommentItemContainer';

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
  handleClickShowMore() {
    if (this.props.loaded[this.props.articleId]) {
      this.props.unfoldComments(this.props.articleId);
    } else {
      this.props.loadComments(this.props.articleId);
    }
  },

  renderComment(comment) {
    return (
      <CommentItemContainer
        writer={comment.writer.id}
        comment={comment}
        key={comment.id}
        articleId={this.props.articleId}
        />
    );
  },

  render() {
    const comments = this.props.comments[this.props.articleId] || [];
    const commentsNum = this.props.commentsNum[this.props.articleId] || 0;
    const isFold = this.props.fold[this.props.articleId];
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
    if ((!this.props.loaded[this.props.articleId] || isFold) && commentsNum > commentsNumToShow) {
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

const mapStateToProps = function (state) {
  return {
    loaded: state.comment.loaded,
    fold: state.comment.fold,
    comments: state.comment.comments,
    commentsNum: state.comment.count
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadComments: id => loadComments(dispatch, id),
    unfoldComments: id => unfoldComments(dispatch, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
