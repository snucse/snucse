import React from 'react'
import { DataCon } from '../../utils'
import CommentItem from './CommentItem.js'

/*
  props
  - comment
*/
let CommentItemContainer = React.createClass({
  onDelete: () => {
  },

  onEdit: () => {
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
