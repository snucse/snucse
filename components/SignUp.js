import React from 'react';
import {connect} from 'react-redux';

import {DataCon, Url, genRefCallback, connectModals} from '../utils';
import Modal from './Modal';

import '../stylesheets/login.styl';

const SignUp = React.createClass({
  render() {
    const modal = this.props.modalEnabled ? <Modal/> : null;
    return (
      <div id="login-background">
        <div id="signup-box-container">
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
          <h2 id="signup-box-title">SNUCSE</h2>
          <div id="signup-box">
            <div id="signup-box-header">
              컴퓨터공학부 학사, 석사, 박사과정에 재학 중이거나 이수한 학생,<br/>부전공, 복수전공자 그리고 교직원에게만 계정이 발급됩니다.<br/>스누씨에는 <a href="https://id.snucse.org/Privacy.aspx" target="_blank" rel="noopener noreferrer">개인정보 처리방침</a>이 적용됩니다. 동의하지 않으시는 분은 가입을 중단해 주십시오.
            </div>
            <SignUpForm/>
          </div>
        </div>
        {modal}
      </div>
    );
  }
});

const formNames = ['username', 'name', 'birthday', 'bsNumber', 'phoneNumber', 'email'];
const usernameReg = /^[A-Za-z][A-Za-z0-9]*$/;
const birthReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const bsNumReg = /^[0-9]{4}-[0-9]{5}$/;
const phoneNumReg = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

const SignUpForm = connectModals(React.createClass({
  handleSignUp(e) {
    e.preventDefault();
    const values = this.validateForm();
    if (values === null) {
      return;
    }

    DataCon.postDataToServer(Url.getUrl('/users/sign_up'), 'POST', values)
      .then(() => {
        this.props.alertModal('알림', '가입에 성공하였습니다.');
        this.props.history.push('/login');
      }).catch(() => {
        // TODO: 에러 발생 조건에 뭐가 있는지 확인하기
        this.props.alertModal('알림', '가입에 실패했습니다.');
      });
  },

  renderInput(refName, placeholder, type = 'text') {
    const id = `signup-${refName}-input`;
    return <input id={id} className="signup-form-input" type={type} placeholder={placeholder} ref={genRefCallback(this, refName)}/>;
  },

  validateForm() {
    const values = formNames.reduce((prev, curr) => {
      return {...prev, [curr]: this[curr].value};
    }, {});

    if (!(usernameReg.test(values.username))) {
      this.props.alertModal('알림', '아이디는 영문자로 시작하며, 영문자 혹은 숫자로만 이루어져야 합니다.', () => {
        this.username.focus();
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

    if (values.email.length === 0) {
      this.props.alertModal('알림', '이메일을 입력해주세요.', () => {
        this.email.focus();
      });
      return null;
    }

    if (!this.privacy.checked) {
      this.props.alertModal('알림', '개인정보 수집, 이용 및 제공에 동의해주세요.', () => {
        this.privacy.focus();
      });
      return null;
    }

    return values;
  },

  render() {
    return (
      <form id="signup-form">
        <div className="signup-form-group">
          <label className="signup-form-label" htmlFor="signup-username-input">아이디</label>
          {this.renderInput('username', 'ID')}
        </div>
        <div className="signup-form-group">
          <label className="signup-form-label" htmlFor="signup-name-input">이름</label>
          {this.renderInput('name', '홍길동')}
        </div>
        <div className="signup-form-group">
          <label className="signup-form-label" htmlFor="signup-birthday-input">생년월일</label>
          {this.renderInput('birthday', '1998-01-01', 'date')}
        </div>
        <div className="signup-form-group">
          <label className="signup-form-label" htmlFor="signup-bsNumber-input">학번</label>
          {this.renderInput('bsNumber', '2017-10000')}
        </div>
        <div className="signup-form-group">
          <label className="signup-form-label" htmlFor="signup-phoneNumber-input">휴대전화/연락처</label>
          {this.renderInput('phoneNumber', '010-1234-5678')}
        </div>
        <div className="signup-form-group">
          <label className="signup-form-label" htmlFor="signup-email-input">이메일</label>
          {this.renderInput('email', 'example@example.com', 'email')}
          <div className="signup-form-description">
            가입 승인 후 이메일로 임시 비밀번호가 발송됩니다.
          </div>
        </div>
        <div className="signup-form-group">
          <label className="signup-form-label" htmlFor="signup-privacy-input">개인정보 수집, 이용 동의</label>
          <div className="signup-form-box">
            {this.renderInput('privacy', '', 'checkbox')} <a href="#" target="_blank" rel="noopener noreferrer">개인정보 수집, 이용 및 제공</a>에 동의합니다.
          </div>
        </div>
        <div id="signup-button-container">
          <button id="signup-button" onClick={this.handleSignUp}>가입 신청</button>
        </div>
      </form>
    );
  }
}));

const mapStateToProps = function (state) {
  return {
    modalEnabled: state.modal.enabled
  };
};

export default connect(mapStateToProps)(SignUp);
