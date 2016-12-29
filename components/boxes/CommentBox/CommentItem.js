import React from 'react';
import moment from 'moment';

import {connectModals} from '../../../utils';

/*
  props
  - isEditable
  - isDeletable
  - comment

  - onDelete
  - onEdit
  - recommendBox

  state
  - newContent
  - isEditMode
*/
const CommentItem = React.createClass({
  handleClickDelete() {
    this.props.confirmModal('알림', '정말로 삭제하시겠습니까?', () => {
      this.props.onDelete();
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    this.props.onEdit(this.state.newContent);
    this.handleEditDisable();
  },

  handleClickCancel(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.confirmModal('알림', '작성중인 내용이 지워집니다. 계속하시겠습니까?', () => {
      this.handleEditDisable();
    });
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
    const editBox = this.props.isEditable && this.state.isEditMode ?
      <form className="comment-editbox" onSubmit={this.handleSubmit}>
        <input onChange={this.handleEdit} defaultValue={this.state.newContent}/>
        <button>수정</button>
        <button onClick={this.handleClickCancel}>취소</button>
      </form> :
      null;
    let contentWrapper = null;
    let controller = null;
    if (!this.state.isEditMode) {
      contentWrapper = <div className="comment-content">{this.props.comment.content}</div>;
      const buttons = [];
      const id = this.props.comment.id;
      if (this.props.isDeletable) {
        buttons.push(<button className="comment-delete-button" onClick={this.handleClickDelete} key={`delete-button-${id}`}>삭제</button>);
      }
      if (this.props.isEditable) {
        buttons.push(<button className="comment-edit-button" onClick={this.handleEditEnable} key={`edit-button-${id}`}>수정</button>);
      }
      controller = (
        <div className="comment-controller">
          {buttons}
        </div>
      );
    }
    // todo link to user profile?
    const {writer, createdAt} = this.props.comment;
    moment.locale('ko');
    const date = moment(createdAt);
    return (
      <li className="comment-item">
        <div className="comment-writer-container">
          <img className="comment-writer-image" src={writer.profileImageUri}/>
        </div>
        <div className="comment-main">
          <small className="comment-date" title={date.format('LLL')}>{date.fromNow()}</small>
          <h5 className="comment-writer-name">{writer.name}</h5>
          {contentWrapper}
          {editBox}
          {this.props.recommendBox}
          {controller}
        </div>
      </li>
    );
  }
});

export default connectModals(CommentItem);
