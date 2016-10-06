import React from 'react';
import {connect} from 'react-redux';

import {deleteComment, editComment} from '../../actions';
import {DataCon, Url} from '../../utils';
import CommentItem from './CommentItem.js';

/*
  props
  - comment
  - articleId
*/
const CommentItemContainer = React.createClass({
  handleDelete() {
    const url = Url.getUrl('comments/' + this.props.comment.id);
    DataCon.postDataToServer(url, 'DELETE').then(res => {
      this.props.deleteComment(this.props.articleId, this.props.comment.id);
    }).catch(console.error);
  },

  handleEdit(newContent) {
    const url = Url.getUrl('comments/' + this.props.comment.id);
    const data = {
      content: newContent
    };
    DataCon.postDataToServer(url, 'PUT', data).then(res => {
      this.props.editComment(this.props.articleId, res);
    }).catch(console.error);
  },

  render() {
    return (
      <CommentItem
        comment={this.props.comment}
        isEditable={true}
        isDeletable={true}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        />
    );
    // fixme compare its writer id and user id
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    deleteComment: (articleId, comment) => {
      dispatch(deleteComment(articleId, comment));
    },
    editComment: (articleId, comment) => {
      dispatch(editComment(articleId, comment));
    }
  };
};

export default connect(null, mapDispatchToProps)(CommentItemContainer);
