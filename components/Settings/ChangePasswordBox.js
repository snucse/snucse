import React from 'react';
import {connect} from 'react-redux';

import {genRefCallback, connectModals} from '../../utils';
import {changePassword} from '../../actions/dispatchers';

const ChangePasswordBox = React.createClass({
  handleChangePasswordSubmit(event) {
    event.preventDefault();
    const currentPassword = this._current.value;
    const newPassword = this._new.value;
    const confirmPassword = this._confirm.value;
    if (currentPassword === '') {
      this.props.alertModal('알림', '현재 비밀번호를 입력해주세요.');
      this._current.focus();
      return;
    }
    if (newPassword === '') {
      this.props.alertModal('알림', '새 비밀번호를 입력해주세요.', () => {
        this._new.focus();
      });
      return;
    }
    if (confirmPassword === '') {
      this.props.alertModal('알림', '새로 입력하신 비밀번호를 확인해주세요.', () => {
        this._confirm.focus();
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      this.props.alertModal('알림', '새로 입력하신 비밀번호를 다시 확인해주세요.', () => {
        this._confirm.value = ''; // 이렇게 동작해도 될까요
        this._confirm.focus();
      });
      return;
    }
    this.props.changePassword(currentPassword, newPassword);
    this._current.value = '';
    this._new.value = '';
    this._confirm.value = '';
  },

  render() {
    return (
      <form onSubmit={this.handleChangePasswordSubmit}>
        <div className="change-password-form-group">
          <label className="change-password-form-label" htmlFor="settings-current-password-input">현재 비밀번호</label>
          <div className="change-password-form-input-container">
            <input id="settings-current-password-input" className="change-password-form-input" type="password" ref={genRefCallback(this, '_current')}/>
          </div>
        </div>
        <div className="change-password-form-group">
          <label className="change-password-form-label" htmlFor="settings-new-password-input">새 비밀번호</label>
          <div className="change-password-form-input-container">
            <input id="settings-new-password-input" className="change-password-form-input" type="password" ref={genRefCallback(this, '_new')}/>
          </div>
        </div>
        <div className="change-password-form-group">
          <label className="change-password-form-label" htmlFor="settings-confirm-password-input">새 비밀번호 확인</label>
          <div className="change-password-form-input-container">
            <input id="settings-confirm-password-input" className="change-password-form-input" type="password" ref={genRefCallback(this, '_confirm')}/>
          </div>
        </div>
        <div className="change-password-form-group">
          <button id="change-password-button">변경</button>
        </div>
      </form>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    changePassword: (currentPassword, newPassword) => changePassword(dispatch, currentPassword, newPassword)
  };
};

export default connectModals(connect(null, mapDispatchToProps)(ChangePasswordBox));
