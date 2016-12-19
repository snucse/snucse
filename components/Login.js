import React from 'react';
import {Link, browserHistory} from 'react-router';

import {DataCon, Url, genRefCallback, connectModals} from '../utils';
import Modal from './Modal';
import '../stylesheets/modalbox.styl';

const Login = React.createClass({
  render() {
    return (
      <div>
        <Link to="/">메인으로</Link><br/>
        <LoginForm/>
        <Link to="/sign-up">가입하기</Link>
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
      <form id="login" onSubmit={this.handleLogin}>
        로그인<br/>
        아이디: <input type="text" autoFocus ref={genRefCallback(this, 'id')}/><br/>
        비밀번호: <input type="password" ref={genRefCallback(this, 'password')}/><br/>
        <button>로그인</button>
      </form>
    );
  }
}));

export default Login;
