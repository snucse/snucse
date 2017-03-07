import React from 'react';

import CommentForm from './CommentForm';

const CommentFormContainer = React.createClass({

  propTypes: {
    id: React.PropTypes.number.isRequired,
    parentCommentId: React.PropTypes.number,
    writeComment: React.PropTypes.func.isRequired,
    isChild: React.PropTypes.bool
  },

  handleWrite(content) {
    this.props.writeComment(this.props.id, content, this.props.parentCommentId);
  },

  render() {
    return <CommentForm onWrite={this.handleWrite} isChild={this.props.isChild}/>;
  }
});

export default CommentFormContainer;
