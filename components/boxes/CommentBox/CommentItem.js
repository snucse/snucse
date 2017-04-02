import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import Realtime from '../../Realtime';
import {connectModals} from '../../../utils';

const CommentItem = React.createClass({

  propTypes: {
    comment: React.PropTypes.object.isRequired,
    isDeletable: React.PropTypes.bool,
    onDelete: React.PropTypes.func,
    isEditable: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    recommendBox: React.PropTypes.element,
    isChild: React.PropTypes.bool,
    replyList: React.PropTypes.element,
    replyForm: React.PropTypes.element
  },

  handleClickReply() {
    this.setState({replyForm: true});
  },

  handleHideReplyForm() {
    this.setState({replyForm: false});
  },

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
      isEditMode: false,
      replyForm: false
    };
    // fixme erase state newContent! 난 안 할래
  },

  componentWillReceiveProps(props) {
    this.setState({
      newContent: props.comment.content
    });
  },

  render() {
    const editBox = this.props.isEditable && this.state.isEditMode ? (
      <form className="comment-edit-form" onSubmit={this.handleSubmit}>
        <div className="comment-edit-input-container">
          <input className="comment-edit-input" onChange={this.handleEdit} defaultValue={this.state.newContent}/>
        </div>
        <button className="comment-edit-submit-button">수정</button>
        <button className="comment-edit-cancel-button" onClick={this.handleClickCancel}>취소</button>
      </form>
    ) : null;
    let contentWrapper = null;
    let controller = null;
    if (!this.state.isEditMode) {
      contentWrapper = (
        <div
          className="comment-content"
          dangerouslySetInnerHTML={{__html: this.props.comment.renderedContent}}
          />
      );
      const buttons = [];
      const id = this.props.comment.id;
      if (!this.props.isChild) {
        buttons.push(<button className="comment-reply-button" onClick={this.handleClickReply} key={`reply-button-${id}`}>답글</button>);
      }
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
    let replyBox = null;
    if (!this.props.isChild) {
      let replyForm = null;
      let cancelReply = null;
      if (this.state.replyForm) {
        replyForm = this.props.replyForm;
        cancelReply = <button className="reply-cancel-button" onClick={this.handleHideReplyForm}>취소</button>;
      }
      replyBox = (
        <div className="comment-reply">
          {this.props.replyList}
          {replyForm}
          {cancelReply}
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
          <small className="comment-date" title={date.format('LLL')}>
            <Realtime from={date}/>
          </small>
          <h5 className="comment-writer-name"><Link to={`/${writer.username}`}>{writer.name}</Link></h5>
          {contentWrapper}
          {editBox}
          {this.props.recommendBox}
          {controller}
        </div>
        {replyBox}
      </li>
    );
  }
});

export default connectModals(CommentItem);
