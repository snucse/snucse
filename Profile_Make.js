import React from 'react';
import DataCon from './Util.js';
import $ from 'jquery';
import browserHistory from 'react-router';
import 'whatwg-fetch';

var ProfileForm = React.createClass({
  getInitialState: function() {
    return {sid: '', name: '', description: ''};
  },
  handleSidChange: function(e) {
    this.setState({sid: e.target.value});
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },

  handleSubmit: function(e) {
    var reg = /^[A-Za-z_][A-Za-z0-9_]*$/;
    var trimed = {};
    for(var key in this.state){
      if(this.state.hasOwnProperty(key)){
        trimed[key] = this.state[key].trim();
      }
    }

    if(!reg.test(trimed.sid)){
      alert("sid는 영문자로 시작해야 합니다.");
      return;
    }

    if(trimed.name === "" || trimed.description === ""){
      alert("양식을 모두 채워주세요.");
      return;
    }

    fetch(this.props.url, {
      headers:{Authorization: 'Token token='+localStorage.getItem('snucsesession'), 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(trimed)
    }).then((res) => {
      if(res.status >= 200 && res.status < 300){
        alert('프로필 생성에 성공하였습니다.');
        browserHistory.push('/'+sid);
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
        SID: <input type="text" name="sid" value={this.state.sid} onChange={this.handleSidChange} /> <br />
        이름: <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} /> <br />
        설명: <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange} /> <br />
        <input type="submit" value="그룹 만들기" />
        </form>
        </div> );
  }
});

export default ProfileForm;
