import React from 'react'
import { connect } from 'react-redux';

import { writeComment } from '../../actions'
import { DataCon, Url } from '../../utils'
import CommentForm from './CommentForm.js'

/*
  props
  - articleId
*/
let CommentFormContainer = React.createClass({
  onWrite: function(content){
    const url = Url.getUrl('comments')
    const data = {
      article_id: this.props.articleId,
      content: content,
    }
    DataCon.postDataToServer(url, 'POST', data).then(res => {
      this.props.writeComment(this.props.articleId, res)
    }).catch(console.error)
  },

  render: function(){
    return <CommentForm onWrite={this.onWrite} />
  },
})

let mapDispatchToProps = function(dispatch){
  return {
    writeComment: (articleId, comment) => { dispatch(writeComment(articleId, comment)) },
  }
}

CommentFormContainer = connect(null, mapDispatchToProps)(CommentFormContainer)

export default CommentFormContainer
