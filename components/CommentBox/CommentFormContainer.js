import React from 'react';
import {connect} from 'react-redux';

import {writeComment} from '../../actions';
import {DataCon, Url} from '../../utils';
import CommentForm from './CommentForm';

/*
  props
  - articleId
*/
const CommentFormContainer = React.createClass({
  handleWrite(content) {
    const url = Url.getUrl('comments');
    const data = {
      articleId: this.props.articleId,
      content
    };
    DataCon.postDataToServer(url, 'POST', data).then(res => {
      this.props.writeComment(this.props.articleId, res);
    }).catch(console.error);
  },

  render() {
    return <CommentForm onWrite={this.handleWrite}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    writeComment: (articleId, comment) => {
      dispatch(writeComment(articleId, comment));
    }
  };
};

export default connect(null, mapDispatchToProps)(CommentFormContainer);
