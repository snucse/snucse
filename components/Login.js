import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {DataCon, Url, genRefCallback} from '../utils';
import {alertModal} from '../actions/dispatchers';
import Modal from './Modal';
import '../stylesheets/modalbox.styl';

import '../stylesheets/login.styl';

const Login = React.createClass({
  render() {
    const modal = this.props.modalEnabled ? <Modal/> : null;
    return (
      <div id="login-background">
        <div id="login-box-container">
          <div id="login-github">
            <a
              href="https://github.com/snucse/snucse"
              target="_blank"
              className="login-github-link"
              rel="noopener noreferrer"
              >
              GitHub
            </a>
          </div>
          <h2 id="login-box-title">SNUCSE Login</h2>
          <div id="login-box">
            <h3 id="login-box-header">Welcome! :D</h3>
            <LoginForm/>
            <section id="login-box-footer">
              <a className="login-box-footer-link" href="https://id.snucse.org/verify" target="_blank" rel="noopener noreferrer">가입 신청하기</a>
              <a className="login-box-footer-link" href="https://id.snucse.org/password-reset" target="_blank" rel="noopener noreferrer">비밀번호 찾기</a>
              <a className="login-box-footer-link" href="https://id.snucse.org/Privacy.aspx" target="_blank" rel="noopener noreferrer">개인정보 처리방침</a>
            </section>
          </div>
        </div>
        {modal}
      </div>
    );
  }
});

const LoginFormBase = React.createClass({
  handleLogin(event) {
    event.preventDefault();
    const username = this.id.value.trim();
    const password = this.password.value;
    this.props.login(username, password);
  },
  render() {
    return (
      <form id="login-form" onSubmit={this.handleLogin}>
        <div id="login-input-container">
          <div className="login-form-group">
            <label className="login-form-label" htmlFor="login-username-input">아이디</label>
            <div className="login-form-input-container">
              <input id="login-username-input" className="login-form-input" type="text" autoFocus ref={genRefCallback(this, 'id')}/>
            </div>
          </div>
          <div className="login-form-group">
            <label className="login-form-label" htmlFor="login-password-input">비밀번호</label>
            <div className="login-form-input-container">
              <input id="login-password-input" className="login-form-input" type="password" ref={genRefCallback(this, 'password')}/>
            </div>
          </div>
        </div>
        <div id="login-button-container">
          <button id="login-button">로그인</button>
        </div>
      </form>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    login: (username, password) => {
      DataCon.postDataToServer(Url.getUrl('/users/sign_in'), 'POST', {
        username, password
      }).then(data => {
        localStorage.setItem('snucsesession', data.accessToken);
        const next = sessionStorage.getItem('entrypath') || '/';
        sessionStorage.removeItem('entrypath');
        dispatch(push(next));
      }).catch(err => {
        if (err.status === 403) {
          alertModal(dispatch, '알림', '아이디 혹은 비밀번호를 확인해 주세요.');
          this.password.value = '';
        } else if (err.status === 419) {
          alertModal(dispatch, '알림', '회원가입 대기중입니다.');
        }
      });
    }
  };
};

const LoginForm = connect(null, mapDispatchToProps)(LoginFormBase);

const mapStateToProps = function (state) {
  return {
    modalEnabled: state.modal.enabled
  };
};

export default connect(mapStateToProps)(Login);
