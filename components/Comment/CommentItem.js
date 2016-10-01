import React from 'react'

/*
  props
  - isEditable
  - isDeletable
  - comment

  - onDelete
  - onEdit

  state
  - newContent
  - isEditMode
*/
let CommentItem = React.createClass({
  onClickDelete: function(){
    if (confirm('정말로 삭제하시겠습니까?')){
      this.props.onDelete()
    }
  },

  onClickEdit: function(){
    this.props.onEdit(this.state.newContent)
    this.onEditDisable()
  },

  onClickCancel: function(){
    if (confirm('작성중인 내용이 지워집니다. 계속하시겠습니까?')){
      this.onEditDisable()
    }
  },

  onEditDisable: function(){
    this.setState({
      newContent: this.props.comment.content,
      isEditMode: false,
    })
  },

  onEditEnable: function(){
    this.setState({
      isEditMode: true,
    })
  },

  onEdit: function(event){
    this.setState({
      newContent: event.target.value,
    })
  },

  getInitialState: function(){
    return {
      newContent: this.props.comment.content,
      isEditMode: false,
    }
  },

  render: function(){
    const edited = this.props.comment.created_at.updated
        ? <span className="comment-edited">수정됨</span>
        : null
    const editBox = this.props.isEditable && this.state.isEditMode
        ? <div className="comment-editbox">
            <input onChange={this.onEdit} defaultValue={this.state.newContent} />
            <button onClick={this.onClickEdit}>수정</button>
            <button onClick={this.onClickCancel}>취소</button>
          </div>
        : null
    let contentWrapper = null
    let controller = null
    if (!this.state.isEditMode){
      contentWrapper = <div className="comment-content">{this.props.comment.content}</div>
      const buttons = []
      const id = this.props.comment.id
      if (this.props.isDeletable) buttons.push(<button onClick={this.onClickDelete} key={`delete-button-${id}`}>삭제</button>)
      if (this.props.isEditable) buttons.push(<button onClick={this.onEditEnable} key={`edit-button-${id}`}>수정</button>)
      controller = <div className="comment-controller">{buttons}</div>
    }
    // todo link to user profile?
    return (
      <li className="comment-item">
        <div className="comment-information">
          <img src={this.props.comment.writer.profile_image_url} /> 
          <a>{this.props.comment.writer.name}</a> 
          {this.props.comment.created_at.date} {this.props.comment.created_at.time} {edited}
        </div>
        {contentWrapper}
        {editBox}
        {controller}
      </li>
    )
  }
})

export default CommentItem
