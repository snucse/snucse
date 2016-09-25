import React from 'react'
import { DataCon } from '../../utils'
import CommentList from './CommentList.js'
import CommentFormContainer from './CommentFormContainer.js'

let fake_data = [
  {
    "id": 1,
    "content": "content",
    "created_at": { "date": "20160801",
      "time": "01:23:45",
      "updated": false
    },
    "writer": {
      "id": 1,
      "username": "writer",
      "name": "작성자",
      "profile_image_url": "http://placehold.it/100x100"
    }
  },
  {
    "id": 2,
    "content": "뀨꺄",
    "created_at": {
      "date": "20160922",
      "time": "01:23:45",
      "updated": true
    },
    "writer": {
      "id": 1,
      "username": "writer",
      "name": "작성자",
      "profile_image_url": "http://placehold.it/100x100"
    }
  }
]

/*
  props
  - articleId
  - isAddable
*/
let CommentBox = React.createClass({
  render: function(){
    let commentForm = this.props.isAddable
        ? <CommentFormContainer />
        : null
    return (
      <section className="comment-wrapper">
        <CommentList comments={fake_data} isFold={true} />
        {commentForm}
      </section>
    )
    // fixme fake_data should be replaced with store.comment.comments[this.props.articleId]
  }
})

export default CommentBox
