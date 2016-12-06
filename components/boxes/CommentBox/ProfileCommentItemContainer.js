import React from 'react';
import {connect} from 'react-redux';

import {deleteProfileComment, editProfileComment} from '../../../actions/dispatchers';
import CommentItem from './CommentItem';

/*
  props
  - comment
  - profileId
*/
const ProfileCommentItemContainer = React.createClass({
  handleDelete() {
    this.props.deleteComment(this.props.comment.id, this.props.profileId);
  },

  handleEdit(newContent) {
    this.props.editComment(this.props.comment.id, this.props.profileId, newContent);
  },

  render() {
    const mine = (this.props.userId === this.props.writer);
    return (
      <CommentItem
        comment={this.props.comment}
        isEditable={mine}
        isDeletable={mine}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userId.userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    deleteComment: (commentId, profileId) => {
      deleteProfileComment(dispatch, commentId, profileId);
    },
    editComment: (commentId, profileId, newContent) => {
      editProfileComment(dispatch, commentId, profileId, newContent);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCommentItemContainer);
