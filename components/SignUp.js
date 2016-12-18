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

const formNames = ['id', 'password', 'password2', 'birthYear', 'birthMonth', 'birthDay', 'bsNumber1', 'bsNnumber2', 'phoneNumber1', 'phoneNumber2', 'phoneNumber3'];
const birthReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const bsNumReg = /^[0-9]{4}-[0-9]{5}$/;
const phoneNumReg = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;

const SignUpForm = React.createClass({
  handleSignUp() {
    const values = this.validateForm();
    if (!values) {
      return;
    }

    DataCon.postDataToServer(Url.getUrl('/users/sign_up'), 'POST', values)
      .then(() => {
        browserHistory.push('/login');
      }).catch(() => {
        // TODO: 에러 발생 조건에 뭐가 있는지 확인하기
        alert('가입에 실패했습니다.');
      });
  },

  renderInput(refName, type = 'text') {
    return <input type={type} ref={genRefCallback(this, refName)}/>;
  },

  validateForm() {
    const values = formNames.reduce((prev, curr) => {
      return {...prev, [curr]: this[curr].value};
    }, {});

    if (values.password !== values.password2) {
      alert('비밀번호를 확인해주세요.');
      return null;
    }

    const birth = [values.birthYear, values.birthMonth, values.birthDay].join('-');
    if (birth !== '--' && !(birthReg.test(birth))) {
      alert('생년월일을 정확히 입력해주세요. e.g.) 1900-01-01');
      return null;
    }

    const bsNumber = [values.bsNumber1, values.bsNumber2].join('-');
    if (bsNumber !== '-' && !(bsNumReg.test(bsNumber))) {
      alert('학번을 정확히 입력해주세요. e.g.) 2017-10000');
      return null;
    }

    const phoneNumber = [values.phoneNumber1, values.phoneNumber2, values.phoneNumber3].join('-');
    if (phoneNumber !== '--' && !(phoneNumReg.test(phoneNumber))) {
      alert('전화번호를 정확히 입력해주세요. e.g.) 010-123-4567 또는 010-1234-5678');
      return null;
    }

    return values;
  },

  render() {
    // 생년월일: {this.renderInput('birthYear')}년 {this.renderInput('birthMonth')}월 {this.renderInput('birthDay')}일<br/>
    return (
      <form>
        가입<br/>
        * 표시는 필수사항입니다.<br/>
        * 아이디: <input type="text" autoFocus ref={genRefCallback(this, 'id')}/><br/>
        * 비밀번호: {this.renderInput('password')}<br/>
        * 비밀번호 확인: {this.renderInput('password2', 'password')}<br/>
        * 이름: {this.renderInput('myname')}<br/>
        생년월일: {this.renderInput('birth', 'date')}<br/>
        학번: {this.renderInput('bsNumber1')}-{this.renderInput('bsNumber2')}<br/>
        휴대전화: {this.renderInput('phoneNumber1')}-{this.renderInput('phoneNumber2')}-{this.renderInput('phoneNumber3')}<br/>
        <button onClick={this.handleSignUp}>가입</button>
      </form>
    );
  }
});

export default SignUp;
