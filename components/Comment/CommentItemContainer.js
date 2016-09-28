import React from 'react'
import { connect } from 'react-redux';

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
    const data = {}
    DataCon.postDataToServer(url, data, 'DELETE')
    // 해당 댓글 삭제 통신
    // 원래는 해당 댓글을 삭제했다는 액션을 디스패치 해야할 것 같음
  },

  onEdit: function(newContent){
    const url = Url.getUrl('comments/' + this.props.comment.id)
    const data = {
      content: newContent,
    }
    DataCon.postDataToServer(url, data, 'PUT')
    // 해당 댓글 수정 통신
    // 원래는 해당 댓글을 새 댓글로 수정했다는 액션을 디스패치 해야할 것 같음
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

export default CommentItemContainer
