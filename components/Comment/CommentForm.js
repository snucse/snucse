import React from 'react'

/*
  props
  - onWrite

  state
  - content
*/
let CommentForm = React.createClass({
  onClickWrite: function(){
    if ((this._content || false) && this._content.value !== ''){
      this.props.onWrite(this._content.value)
      this._content.value = ''
    }
  },

  render: function(){
    // button 모양이지만 onsubmit 이벤트를 일으키지 않기 위해 input type button을 사용함
    return (
      <form className="comment-form">
        <input ref={ref => this._content = ref} />
        <input onClick={this.onClickWrite} type="button" value="확인" />
      </form>
    )
  },
})

export default CommentForm
