import React from 'react';

import '../../../stylesheets/comment-box.styl';
import CommentList from './CommentList';
import CommentFormContainer from './CommentFormContainer';

/*
  props
  - Box
    - id
    - lastComment
    - commentCount
    - isAddable
    - loadComments
    - setLastComment
  - FormContainer
    - writeComment
  - List
    - modifyFoldComments
    - commentsInfo
    - renderRecommendBox
  - ItemContainer
    - writeComment
    - editComment
    - deleteComment
    - recommendBox
*/
const CommentBox = React.createClass({
  componentDidMount() {
    if (this.props.lastComment) {
      this.props.setLastComment(this.props.id, this.props.lastComment, this.props.commentCount);
    } else {
      this.props.loadComments(this.props.id);
    }
  },

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id) {
      if (props.lastComment) {
        props.setLastComment(props.id, props.lastComment, props.commentCount);
      } else {
        props.loadComments(props.id);
      }
    }
  },

  render() {
    const commentForm = this.props.isAddable ?
      <CommentFormContainer id={this.props.id} writeComment={this.props.writeComment}/> :
      null;
    return (
      <div className="comment-container">
        <div className="comment-prefix"/>
        <div className="comment-main-container">
          <CommentList
            id={this.props.id}
            loadComments={this.props.loadComments}
            modifyFoldComments={this.props.modifyFoldComments}
            writeComment={this.props.writeComment}
            deleteComment={this.props.deleteComment}
            editComment={this.props.editComment}
            commentsInfo={this.props.commentsInfo}
            renderRecommendBox={this.props.renderRecommendBox}
            />
          {commentForm}
        </div>
      </div>
    );
  }
});

export default CommentBox;
