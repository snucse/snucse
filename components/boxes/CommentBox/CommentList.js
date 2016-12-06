import React from 'react';
import {connect} from 'react-redux';

import {loadComments, modifyFoldComments} from '../../../actions/dispatchers';
import CommentItemContainer from './CommentItemContainer';

const FOLD_COMMENT_LIMIT = 1;

/*
  props
  - articleId
*/
const CommentList = React.createClass({
  componentDidMount() {
    this.props.foldComments(this.props.articleId);
  },

  componentWillReceiveProps(props) {
    if (this.props.articleId !== props.articleId) {
      this.props.foldComments(props.articleId);
    }
  },

  handleClickShowMore() {
    if (!this.props.loaded[this.props.articleId]) {
      this.props.loadComments(this.props.articleId);
    }
    this.props.unfoldComments(this.props.articleId);
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
    loaded: state.comment.article.loaded,
    fold: state.comment.article.fold,
    comments: state.comment.article.comments,
    commentsNum: state.comment.article.count
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadComments: id => loadComments(dispatch, id),
    foldComments: id => modifyFoldComments(dispatch, id, true),
    unfoldComments: id => modifyFoldComments(dispatch, id, false)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
