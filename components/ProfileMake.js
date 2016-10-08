import React from 'react';
import DataCon from '../utils/DataCon';
import $ from 'jquery';
import browserHistory from 'react-router';
import { changeSid, changeName, changeDesc } from '../actions/profileFormAction';
import { connect } from 'react-redux'

var ProfileForm = React.createClass({
  handleSidChange: function(e) {
    this.props.changeSid(e.target.value);
  },
  handleNameChange: function(e) {
    this.props.changeName(e.target.value);
  },
  handleDescriptionChange: function(e) {
    this.props.changeDesc(e.target.value);
  },

  handleSubmit: function(e) {
    const reg = /^[[a-zA-Z][a-zA-Z0-9_]+$/;
    const trimmed = {
      sid: this.props.sid.trim(),
      name: this.props.name.trim(),
      description: this.props.desc.trim(),
    };

    if(!reg.test(trimmed.sid)){
      alert("sid mismatch: sid should be \"[a-zA-Z][a-zA-Z0-9_]+\"");
      return false;
    }

    if(trimmed.name === "" || trimmed.description === ""){
      alert("양식을 모두 채워주세요.");
      return false;
    }

    DataCon.postDataToServer(this.props.url, 'POST', trimmed)
      .then((res) => {
        if(res.status >= 200 && res.status < 300){
          alert('프로필 생성에 성공하였습니다.');
        }
        else{
          // TODO
          // 중복 sid 등의 예외 처리
        }
      });
  },

  render: function() {
    return (
        <div className="profileForm">
        <form onSubmit={this.handleSubmit}>
        SID: <input type="text" name="sid" value={this.props.sid} onChange={this.handleSidChange} /> <br />
        이름: <input type="text" name="name" value={this.props.name} onChange={this.handleNameChange} /> <br />
        설명: <input type="text" name="description" value={this.props.desc} onChange={this.handleDescriptionChange} /> <br />
        <input type="submit" value="그룹 만들기" />
        </form>
        </div> );
  }
});

let mapStateToProps = function(state) {
  return {
    sid: state.profileForm.sid,
    name: state.profileForm.name,
    desc: state.profileForm.desc,
  };
}

let mapDispatchToProps = function(dispatch) {
  return {
    changeSid: (data) => { dispatch(changeSid(data)) },
    changeName: (data) => { dispatch(changeName(data)) },
    changeDesc: (data) => { dispatch(changeDesc(data)) },
  };
}

ProfileForm = connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

export default ProfileForm;
