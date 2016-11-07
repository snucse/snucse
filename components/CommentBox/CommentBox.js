import React from 'react';
import {connect} from 'react-redux';

import {loadComments} from '../../actions/dispatchers';
import '../../stylesheets/comment-box.styl';
import CommentList from './CommentList';
import CommentFormContainer from './CommentFormContainer';

/*
  props
  - articleId
  - isAddable
*/
const CommentBox = React.createClass({
  componentDidMount() {
    this.props.loadComments(this.props.articleId);
  },

  render() {
    const commentForm = this.props.isAddable ?
      <CommentFormContainer articleId={this.props.articleId}/> :
      null;
    return (
      <section className="comment-wrapper">
        <CommentList isFold articleId={this.props.articleId}/>
        {commentForm}
      </section>
    );
    // fixme fake_data should be replaced with store.comment.comments[this.props.articleId]
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    loadComments: articleId => loadComments(dispatch, articleId)
  };
};

export default connect(null, mapDispatchToProps)(CommentBox);
