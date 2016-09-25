import React from 'react'
import { DataCon } from '../../utils'
import CommentForm from './CommentForm.js'

let CommentFormContainer = React.createClass({
  onWrite: function(){
    
  },

  render: function(){
    return <CommentForm onWrite={this.onWrite} />
  },
})

export default CommentFormContainer
