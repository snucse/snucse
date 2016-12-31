import React from 'react';
import {Link, browserHistory} from 'react-router';

import {DataCon, Url, genRefCallback, connectModals} from '../utils';
import Modal from './Modal';
import '../stylesheets/modalbox.styl';

import '../stylesheets/login.styl';

const Login = React.createClass({
  render() {
    return (
      <div id="login-background">
        <div id="login-box-container">
          <h2 id="login-box-title">SNUCSE Login</h2>
          <div id="login-box">
            <h3 id="login-box-header">Welcome! :D</h3>
            <LoginForm/>
            <section id="login-box-footer">
              <Link className="login-box-footer-link" to="/sign-up">가입 신청하기</Link>
            </section>
          </div>
        </div>
        <Modal/>
      </div>
    );
  }
});

const LoginForm = connectModals(React.createClass({
  handleLogin(event) {
    event.preventDefault();
    const username = this.id.value.trim();
    const password = this.password.value;
    DataCon.postDataToServer(Url.getUrl('/users/sign_in'), 'POST', {
      username, password
    }).then(data => {
      localStorage.setItem('snucsesession', data.accessToken);
      browserHistory.push('/');
    }).catch(err => {
      if (err.status === 403) {
        this.props.alertModal('알림', '아이디 혹은 비밀번호를 확인해 주세요.');
        this.password.value = '';
      } else if (err.status === 419) {
        this.props.alertModal('알림', '회원가입 대기중입니다.');
      }
    });
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
}));

export default Login;
