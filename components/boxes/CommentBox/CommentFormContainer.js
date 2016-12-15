import React from 'react';

import CommentForm from './CommentForm';

/*
  props
  - id
  - writeComment
*/
const CommentFormContainer = React.createClass({
  handleWrite(content) {
    this.props.writeComment(this.props.id, content);
  },

  render() {
    return <CommentForm onWrite={this.handleWrite}/>;
  }
});

export default CommentFormContainer;
