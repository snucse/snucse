import React from 'react';
import {connect} from 'react-redux';

import {loadComments} from '../../actions';
import {DataCon, Url} from '../../utils';
import CommentList from './CommentList.js';
import CommentFormContainer from './CommentFormContainer.js';

/*
  props
  - articleId
  - isAddable
*/
const CommentBox = React.createClass({
  componentDidMount() {
    const url = Url.getUrl('comments?articleId=' + this.props.articleId);
    DataCon.loadDataFromServer(url).then(data => {
      this.props.loadComments(this.props.articleId, data.comments);
    }).catch(console.error);
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
    loadComments: (articleId, comments) => {
      dispatch(loadComments(articleId, comments));
    }
  };
};

export default connect(null, mapDispatchToProps)(CommentBox);
