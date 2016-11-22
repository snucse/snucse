import React from 'react';
import {connect} from 'react-redux';

import {writeComment} from '../../../actions/dispatchers';
import CommentForm from './CommentForm';

/*
  props
  - articleId
*/
const CommentFormContainer = React.createClass({
  handleWrite(content) {
    const data = {
      articleId: this.props.articleId,
      content
    };
    this.props.writeComment(data);
  },

  render() {
    return <CommentForm onWrite={this.handleWrite}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    writeComment: comment => writeComment(dispatch, comment)
  };
};

export default connect(null, mapDispatchToProps)(CommentFormContainer);
