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
    let edited = this.props.comment.created_at.updated
        ? <span className="comment-edited">수정됨</span>
        : null
    let editBox = this.props.isEditable && this.state.isEditMode
        ? <div className="comment-editbox">
            <input onChange={this.onEdit} defaultValue={this.state.newContent} />
            <button onClick={this.onClickEdit}>수정</button>
            <button onClick={this.onClickCancel}>취소</button>
          </div>
        : null
    let contentWrapper = !this.state.isEditMode
        ? <div className="comment-content">{this.props.comment.content}</div>
        : null
    let deleteButton = this.props.isDeletable
        ? <button onClick={this.onClickDelete}>삭제</button>
        : null
    let editButton = this.props.isEditable
        ? <button onClick={this.onEditEnable}>수정</button>
        : null
    let controller = !this.state.isEditMode
        ? <div className="comment-controller">
            {editButton}
            {deleteButton}
          </div>
        : null
    // fixme 어떻게 정의하는게 깨끗할까요
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
