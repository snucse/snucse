import React from 'react';
import { DataCon } from '../utils';
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
    var reg = /^[[a-zA-Z][a-zA-Z0-9_]+$/;
    var trimmed = {};
    for(var key in this.state){
      if(this.state.hasOwnProperty(key)){
        trimmed[key] = this.state[key].trim();
      }
    }

    if(!reg.test(trimmed.sid)){
      alert("sid는 영어로 시작해야 합니다.");
      return false;
    }

    if(trimmed.name === "" || trimmed.description === ""){
      alert("양식을 모두 채워주세요.");
      return false;
    }

    fetch(this.props.url, {
      headers:{Authorization: 'Token token='+localStorage.getItem('snucsesession'), 'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(trimmed)
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
