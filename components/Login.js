import React from 'react';
import {Link, browserHistory} from 'react-router';
import {DataCon, Url, genRefCallback} from '../utils';

const Login = React.createClass({
  render() {
    return (
      <div>
        <Link to="/">메인으로</Link><br/>
        <LoginForm/>
        <Link to="/sign-up">가입하기</Link>
      </div>
    );
  }
});

const LoginForm = React.createClass({
  handleLogin() {
    const username = this.id.value.trim();
    const password = this.password.value;
    DataCon.postDataToServer(Url.getUrl('users/sign_in'), 'POST', {
      username, password
    }).then(data => {
      localStorage.setItem('snucsesession', data.accessToken);
      browserHistory.push('/');
    }).catch(err => {
      if (err.statusCode === 401) {
        alert('아이디 혹은 비밀번호를 확인해 주세요.');
      }
    });
  },
  render() {
    return (
      <form id="login">
        로그인<br/>
        아이디: <input type="text" autoFocus ref={genRefCallback(this, 'id')}/><br/>
        비밀번호: <input type="password" ref={genRefCallback(this, 'password')}/><br/>
        <input type="button" value="로그인" onClick={this.handleLogin}/>
      </form>
    );
  }
});

export default Login;
