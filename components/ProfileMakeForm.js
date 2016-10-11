import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon} from '../utils';

const reg = /^[a-zA-Z][a-zA-Z0-9_]+$/;

const ProfileMakeForm = React.createClass({
  getInitialState() {
    // sid here because of Ruby on Rails limitation
    return {sid: '', name: '', description: ''};
  },
  handleIdChange(e) {
    this.setState({sid: e.target.value});
  },
  handleNameChange(e) {
    this.setState({name: e.target.value});
  },
  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  },

  handleSubmit(e) {
    e.preventDefault();

    const trimmed = {};
    for (const key of ['sid', 'name', 'description']) {
      trimmed[key] = this.state[key].trim();
    }

    if (!reg.test(trimmed.sid)) {
      alert('id는 영어로 시작해야 합니다.');
      return;
    }

    if (trimmed.name === '' || trimmed.description === '') {
      alert('양식을 모두 채워주세요.');
      return;
    }

    DataCon.postDataToServer(this.props.url, 'POST', trimmed).then(() => {
      alert('프로필 생성에 성공하였습니다.');
      browserHistory.push(`/${trimmed.sid}`);
    }).catch(() => {
      // TODO: 중복 id 등의 예외 처리
    });
  },

  render() {
    return (
      <div className="profileForm">
        <form onSubmit={this.handleSubmit}>
          ID: <input type="text" name="id" value={this.state.sid} onChange={this.handleIdChange}/><br/>
          이름: <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange}/><br/>
          설명: <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange}/><br/>
          <input type="submit" value="그룹 만들기"/>
        </form>
      </div>
    );
  }
});

export default ProfileMakeForm;
