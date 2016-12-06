import React from 'react';
import {connect} from 'react-redux';

import {writeProfileComment} from '../../../actions/dispatchers';
import CommentForm from './CommentForm';

/*
  props
  - profileId
*/
const CommentFormContainer = React.createClass({
  handleWrite(content) {
    const data = {
      profileId: this.props.profileId,
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
    writeComment: comment => writeProfileComment(dispatch, comment)
  };
};

export default connect(null, mapDispatchToProps)(CommentFormContainer);
