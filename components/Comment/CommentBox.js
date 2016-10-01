import React from 'react'
import { connect } from 'react-redux';

import { loadComments } from '../../actions'
import { DataCon, Url } from '../../utils'
import CommentList from './CommentList.js'
import CommentFormContainer from './CommentFormContainer.js'

/*
  props
  - articleId
  - isAddable
*/
let CommentBox = React.createClass({
  componentDidMount: function(){
    let url = Url.getUrl('comments?article_id=' + this.props.articleId)
    DataCon.loadDataFromServer(url).then(data => {
      this.props.loadComments(this.props.articleId, data.comments)
    }).catch(console.error)
  },

  render: function(){
    let commentForm = this.props.isAddable
        ? <CommentFormContainer articleId={this.props.articleId} />
        : null
    return (
      <section className="comment-wrapper">
        <CommentList isFold={true} articleId={this.props.articleId} />
        {commentForm}
      </section>
    )
    // fixme fake_data should be replaced with store.comment.comments[this.props.articleId]
  }
})

let mapDispatchToProps = function(dispatch){
  return {
    loadComments: (articleId, comments) => { dispatch(loadComments(articleId, comments)) },
  }
}

CommentBox = connect(null, mapDispatchToProps)(CommentBox)

export default CommentBox
