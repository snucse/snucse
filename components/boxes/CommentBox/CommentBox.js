import React from 'react';
import {connect} from 'react-redux';

import {loadComments, setLastComment} from '../../../actions/dispatchers';
import '../../../stylesheets/comment-box.styl';
import CommentList from './CommentList';
import CommentFormContainer from './CommentFormContainer';

/*
  props
  - articleId
  - isAddable
*/
const CommentBox = React.createClass({
  componentDidMount() {
    if (this.props.lastComment) {
      this.props.setLastComment(this.props.articleId, this.props.lastComment, this.props.commentCount);
    } else {
      this.props.loadComments(this.props.articleId);
    }
  },

  componentWillReceiveProps(props) {
    if (props.lastComment) {
      props.setLastComment(props.articleId, props.lastComment, props.commentCount);
    } else if (props.articleId !== props.articleId) {
      props.loadComments(props.articleId);
    }
  },

  render() {
    const commentForm = this.props.isAddable ?
      <CommentFormContainer articleId={this.props.articleId}/> :
      null;
    return (
      <section className="comment-wrapper">
        <CommentList articleId={this.props.articleId}/>
        {commentForm}
      </section>
    );
    // fixme fake_data should be replaced with store.comment.comments[this.props.articleId]
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    loadComments: articleId => loadComments(dispatch, articleId),
    setLastComment: (...args) => setLastComment(dispatch, ...args)
  };
};

export default connect(null, mapDispatchToProps)(CommentBox);
