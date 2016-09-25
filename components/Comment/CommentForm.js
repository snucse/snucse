import React from 'react'

/*
  props
  - onWrite

  state
  - content
*/
let CommentForm = React.createClass({
  onClickWrite: function(){
    this.props.onWrite()
  },

  onEdit: function(event){
    this.setState({
      content: event.target.value,
    })
  },

  getInitialState: function(){
    return {
      content: '',
    }
  },

  render: function(){
    // button 모양이지만 onsubmit 이벤트를 일으키지 않기 위해 input type button을 사용함
    return (
      <form className="comment-form">
        <input onChnage={this.onEdit} />
        <input onSubmit={this.onClickWrite} type="button" value="확인" />
      </form>
    )
  },
})

export default CommentForm
