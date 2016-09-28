import React from 'react'

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
    DataCon.postDataToServer(url, data, 'POST')
    // 해당 댓글 쓰기 통신
    // 원래라면 새 댓글을 넣어주는 액션을 디스패치 해야할 것 같음
  },

  render: function(){
    return <CommentForm onWrite={this.onWrite} />
  },
})

export default CommentFormContainer
