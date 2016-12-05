import React from 'react';

import {CommentRecommendBox} from '../../boxes';

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
const CommentItem = React.createClass({
  handleClickDelete() {
    if (confirm('정말로 삭제하시겠습니까?')) {
      this.props.onDelete();
    }
  },

  handleClickEdit() {
    this.props.onEdit(this.state.newContent);
    this.handleEditDisable();
  },

  handleClickCancel() {
    if (confirm('작성중인 내용이 지워집니다. 계속하시겠습니까?')) {
      this.handleEditDisable();
    }
  },

  handleEditDisable() {
    this.setState({
      newContent: this.props.comment.content,
      isEditMode: false
    });
  },

  handleEditEnable() {
    this.setState({
      isEditMode: true
    });
  },

  handleEdit(event) {
    this.setState({
      newContent: event.target.value
    });
  },

  getInitialState() {
    return {
      newContent: this.props.comment.content,
      isEditMode: false
    };
    // fixme erase state newContent! 난 안 할래
  },

  componentWillReceiveProps(props) {
    this.setState({
      newContent: props.comment.content
    });
  },

  render() {
    const edited = this.props.comment.createdAt.updated ?
      <span className="comment-edited">수정됨</span> :
      null;
    const editBox = this.props.isEditable && this.state.isEditMode ?
      <div className="comment-editbox">
        <input onChange={this.handleEdit} defaultValue={this.state.newContent}/>
        <button onClick={this.handleClickEdit}>수정</button>
        <button onClick={this.handleClickCancel}>취소</button>
      </div> :
      null;
    let contentWrapper = null;
    let controller = null;
    if (!this.state.isEditMode) {
      contentWrapper = <div className="comment-content">{this.props.comment.content}</div>;
      const buttons = [];
      const id = this.props.comment.id;
      if (this.props.isDeletable) {
        buttons.push(<button onClick={this.handleClickDelete} key={`delete-button-${id}`}>삭제</button>);
      }
      if (this.props.isEditable) {
        buttons.push(<button onClick={this.handleEditEnable} key={`edit-button-${id}`}>수정</button>);
      }
      controller = (
        <div className="comment-controller">
          {buttons}
          <CommentRecommendBox commentId={id}/>
        </div>
      );
    }
    // todo link to user profile?
    const {writer, createdAt} = this.props.comment;
    return (
      <li className="comment-item">
        <div className="comment-information">
          <img src={writer.profileImageUrl}/>
          <a>{writer.name}</a>
          {createdAt.date} {createdAt.time} {edited}
        </div>
        {contentWrapper}
        {editBox}
        {controller}
      </li>
    );
  }
});

export default CommentItem;
