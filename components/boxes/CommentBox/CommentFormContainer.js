import React from 'react';

import CommentForm from './CommentForm';

/*
  props
  - id
  - parentCommentId
  - writeComment
*/
const CommentFormContainer = React.createClass({
  handleWrite(content) {
    this.props.writeComment(this.props.id, content, this.props.parentCommentId);
  },

  render() {
    return <CommentForm onWrite={this.handleWrite}/>;
  }
});

export default CommentFormContainer;
