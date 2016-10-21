import React from 'react';
import {Link, browserHistory} from 'react-router';
import {DataCon, Url, genRefCallback} from '../utils';

const SignUp = React.createClass({
  render() {
    return (
      <div>
        <Link to="/login">로그인</Link>
        <SignUpForm/>
      </div>
    );
  }
});

const SignUpForm = React.createClass({
  handleSignUp() {
    const username = this.id.value.trim();
    const password = this.password.value;
    const name = this.myname.value.trim();
    DataCon.postDataToServer(Url.getUrl('users/sign_up'), 'POST', {
      username, password, name
    }).then(() => {
      browserHistory.push('/login');
    }).catch(() => {
      // TODO: 에러 발생 조건에 뭐가 있는지 확인하기
      alert('가입에 실패했습니다.');
    });
  },
  render() {
    return (
      <form>
        가입<br/>
        아이디: <input type="text" autoFocus ref={genRefCallback(this, 'id')}/><br/>
        비밀번호: <input type="password" ref={genRefCallback(this, 'password')}/><br/>
        이름: <input type="text" ref={genRefCallback(this, 'myname')}/><br/>
        <input type="button" value="가입" onClick={this.handleSignUp}/>
      </form>
    );
  }
});

export default SignUp;
