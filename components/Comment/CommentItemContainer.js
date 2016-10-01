import React from 'react'
import { connect } from 'react-redux';

import { deleteComment, editComment } from '../../actions'
import { DataCon, Url } from '../../utils'
import CommentItem from './CommentItem.js'

/*
  props
  - comment
  - articleId
*/
let CommentItemContainer = React.createClass({
  onDelete: function(){
    const url = Url.getUrl('comments/' + this.props.comment.id)
    DataCon.postDataToServer(url, 'DELETE').then(res => {
      this.props.deleteComment(this.props.articleId, this.props.comment.id)
    }).catch(console.error)
  },

  onEdit: function(newContent){
    const url = Url.getUrl('comments/' + this.props.comment.id)
    const data = {
      content: newContent,
    }
    DataCon.postDataToServer(url, 'PUT', data).then(res => {
      this.props.editComment(this.props.articleId, res)
    }).catch(console.error)
  },

  render: function(){
    return (
      <CommentItem comment={this.props.comment}
          isEditable={true}
          isDeletable={true}
          onDelete={this.onDelete}
          onEdit={this.onEdit} />
    )
    // fixme compare its writer id and user id
  }
})

let mapDispatchToProps = function(dispatch){
  return {
    deleteComment: (articleId, comment) => { dispatch(deleteComment(articleId, comment)) },
    editComment: (articleId, comment) => { dispatch(editComment(articleId, comment)) },
  }
}

CommentItemContainer = connect(null, mapDispatchToProps)(CommentItemContainer)

export default CommentItemContainer
