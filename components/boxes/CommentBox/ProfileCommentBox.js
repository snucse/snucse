import React from 'react';
import {connect} from 'react-redux';

import {loadProfileComments, setLastProfileComment} from '../../../actions/dispatchers';
import '../../../stylesheets/comment-box.styl';
import ProfileCommentList from './ProfileCommentList';
import ProfileCommentFormContainer from './ProfileCommentFormContainer';

/*
  props
  - profileId
  - isAddable
*/
const ProfileCommentBox = React.createClass({
  componentDidMount() {
    if (this.props.lastComment) {
      this.props.setLastComment(this.props.profileId, this.props.lastComment, this.props.commentCount);
    } else {
      this.props.loadComments(this.props.profileId);
    }
  },

  componentWillReceiveProps(props) {
    if (this.props.lastComment) {
      this.props.setLastComment(props.profileId, props.lastComment, props.commentCount);
    } else if (this.props.profileId !== props.profileId) {
      this.props.loadComments(props.profileId);
    }
  },

  render() {
    const commentForm = this.props.isAddable ?
      <ProfileCommentFormContainer profileId={this.props.profileId}/> :
      null;
    return (
      <section className="comment-wrapper">
        <ProfileCommentList profileId={this.props.profileId}/>
        {commentForm}
      </section>
    );
    // fixme fake_data should be replaced with store.comment.comments[this.props.profileId]
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    loadComments: profileId => loadProfileComments(dispatch, profileId),
    setLastComment: (...args) => setLastProfileComment(dispatch, ...args)
  };
};

export default connect(null, mapDispatchToProps)(ProfileCommentBox);
