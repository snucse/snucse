import React from 'react';
import {connect} from 'react-redux';

import {Link, browserHistory} from 'react-router';
import {DataCon, Url, genRefCallback} from '../utils';
import {alertModal} from '../actions/dispatchers';
import Modal from './Modal';

const SignUp = React.createClass({
  render() {
    return (
      <div>
        <Link to="/login">로그인</Link>
        <SignUpForm/>
        <Modal/>
      </div>
    );
  }
});

const formNames = ['username', 'password', 'password2', 'name', 'birthday', 'bsNumber', 'phoneNumber'];
const birthReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const bsNumReg = /^[0-9]{4}-[0-9]{5}$/;
const phoneNumReg = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

const mapDispatchToProps = function (dispatch) {
  return {
    alertModal: (title, message, callback) => alertModal(dispatch, title, message, callback)
  };
};

const SignUpForm = connect(null, mapDispatchToProps)(React.createClass({
  handleSignUp(e) {
    e.preventDefault();
    const values = this.validateForm();
    if (values === null) {
      return;
    }

    DataCon.postDataToServer(Url.getUrl('/users/sign_up'), 'POST', values)
      .then(() => {
        this.props.alertModal('알림', '가입에 성공하였습니다.');
        browserHistory.push('/login');
      }).catch(() => {
        // TODO: 에러 발생 조건에 뭐가 있는지 확인하기
        this.props.alertModal('알림', '가입에 실패했습니다.');
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
      console.log(this);
      this.props.alertModal('알림', '아이디를 입력해주세요.', () => {
        this.username.focus();
      });
      return null;
    }

    if (values.password.length === 0) {
      this.props.alertModal('알림', '비밀번호를 입력해주세요.', () => {
        this.password.focus();
      });
      return null;
    }

    if (values.password !== values.password2) {
      this.props.alertModal('알림', '비밀번호를 확인해주세요.', () => {
        this.password2.focus();
      });
      return null;
    }

    if (values.name.length === 0) {
      this.props.alertModal('알림', '이름을 입력해주세요.', () => {
        this.name.focus();
      });
      return null;
    }

    if (!(birthReg.test(values.birthday))) {
      this.props.alertModal('알림', '생년월일을 정확히 입력해주세요. e.g.) 1900-01-01', () => {
        this.birthday.focus();
      });
      return null;
    }

    if (!(bsNumReg.test(values.bsNumber))) {
      this.props.alertModal('알림', '학번을 정확히 입력해주세요. e.g.) 2017-10000', () => {
        this.bsNumber.focus();
      });
      return null;
    }

    if (!(phoneNumReg.test(values.phoneNumber))) {
      this.props.alertModal('알림', '전화번호를 정확히 입력해주세요. e.g.) 010-123-4567 또는 010-1234-5678', () => {
        this.phoneNumber.focus();
      });
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
        휴대전화/연락처: {this.renderInput('phoneNumber', '010-1234-5678')}<br/>
        <button onClick={this.handleSignUp}>가입</button>
      </form>
    );
  }
}));

export default SignUp;
