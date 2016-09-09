import React from 'react';
import DataCon from './Util.js';
import $ from 'jquery';
import browserHistory from 'react-route'

var ProfileMakeForm = React.createClass({
  getInitialState: () => {
    return {sid: '', name: '', description: ''};
  },
  handleSidChange: (e) => {
    this.setState({sid: e.target.sid});
  },
  handleNameChange: (e) => {
    this.setState({name: e.target.name});
  },
  handleDescriptionChange: (e) => {
    this.setState({discription: e.target.description});
  },

  handleSubmit: (e) => {
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

    DataCon.postDataToServer('/profiles', trimed, 'POST');
    browserHistory.push('/profiles/'+sid);
  }
}
