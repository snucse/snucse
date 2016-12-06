import React from 'react';
import {connect} from 'react-redux';

import {loadProfileComments, modifyFoldProfileComments} from '../../../actions/dispatchers';
import ProfileCommentItemContainer from './CommentItemContainer';

const FOLD_COMMENT_LIMIT = 1;

/*
  props
  - profileId
*/
const ProfileCommentList = React.createClass({
  componentDidMount() {
    this.props.foldComments(this.props.profileId);
  },

  componentWillReceiveProps(props) {
    if (this.props.profileId !== props.profileId) {
      this.props.foldComments(props.profileId);
    }
  },

  handleClickShowMore() {
    if (!this.props.loaded[this.props.profileId]) {
      this.props.loadComments(this.props.profileId);
    }
    this.props.unfoldComments(this.props.profileId);
  },

  renderComment(comment) {
    return (
      <ProfileCommentItemContainer
        writer={comment.writer.id}
        comment={comment}
        key={comment.id}
        profileId={this.props.profileId}
        />
    );
  },

  render() {
    const comments = this.props.comments[this.props.profileId] || [];
    const commentsNum = this.props.commentsNum[this.props.profileId] || 0;
    const isFold = this.props.fold[this.props.profileId];
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
    if ((!this.props.loaded[this.props.profileId] || isFold) && commentsNum > commentsNumToShow) {
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
    loaded: state.comment.profile.loaded,
    fold: state.comment.profile.fold,
    comments: state.comment.profile.comments,
    commentsNum: state.comment.profile.count
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadComments: id => loadProfileComments(dispatch, id),
    foldComments: id => modifyFoldProfileComments(dispatch, id, true),
    unfoldComments: id => modifyFoldProfileComments(dispatch, id, false)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCommentList);
