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

const formNames = ['username', 'password', 'password2', 'name', 'birthday', 'bsNumber', 'phoneNumber'];
const birthReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const bsNumReg = /^[0-9]{4}-[0-9]{5}$/;
const phoneNumReg = /^(02)|([0-9]{3})-[0-9]{3,4}-[0-9]{4}$/;

const SignUpForm = React.createClass({
  handleSignUp(e) {
    e.preventDefault();
    const values = this.validateForm();
    if (values === null) {
      return;
    }

    DataCon.postDataToServer(Url.getUrl('/users/sign_up'), 'POST', values)
      .then(() => {
        alert('가입에 성공하였습니다.');
        browserHistory.push('/login');
      }).catch(() => {
        // TODO: 에러 발생 조건에 뭐가 있는지 확인하기
        alert('가입에 실패했습니다.');
      });
  },

  renderInput(refName, placeholder, type = 'text') {
    return <input type={type} placeholder={placeholder} ref={genRefCallback(this, refName)}/>;
  },

  validateForm() {
    const values = formNames.reduce((prev, curr) => {
      return {...prev, [curr]: this[curr].value};
    }, {});

    if (values.username.length === 0) {
      alert('아이디를 입력해주세요.');
      return null;
    }

    if (values.password.length === 0) {
      alert('비밀번호를 입력해주세요.');
      return null;
    }

    if (values.password !== values.password2) {
      alert('비밀번호를 확인해주세요.');
      return null;
    }

    if (values.name.length === 0) {
      alert('이름을 입력해주세요.');
      return null;
    }

    if (!(birthReg.test(values.birthday))) {
      alert('생년월일을 정확히 입력해주세요. e.g.) 1900-01-01');
      return null;
    }

    if (!(bsNumReg.test(values.bsNumber))) {
      alert('학번을 정확히 입력해주세요. e.g.) 2017-10000');
      return null;
    }

    if (!(phoneNumReg.test(values.phoneNumber))) {
      alert('전화번호를 정확히 입력해주세요. e.g.) 010-123-4567 또는 010-1234-5678');
      return null;
    }

    return values;
  },

  render() {
    return (
      <form>
        가입<br/>
        아이디: {this.renderInput('username', 'id')}<br/>
        비밀번호: {this.renderInput('password', '******', 'password')}<br/>
        비밀번호 확인: {this.renderInput('password2', '******', 'password')}<br/>
        이름: {this.renderInput('name', '홍길동')}<br/>
        생년월일: {this.renderInput('birthday', '1900-01-01', 'date')}<br/>
        학번: {this.renderInput('bsNumber', '2017-10000')}<br/>
        휴대전화: {this.renderInput('phoneNumber', '010-1234-5678')}<br/>
        <button onClick={this.handleSignUp}>가입</button>
      </form>
    );
  }
});

export default SignUp;
