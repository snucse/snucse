import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {DataCon} from '../utils';
import {updateFollowingList} from '../actions/dispatchers';
import {changeId, changeName, changeDesc} from '../actions/profileFormAction';

const reg = /^[a-zA-Z_][a-zA-Z0-9_]+$/;

const ProfileMakeForm = React.createClass({
  handleIdChange(e) {
    this.props.changeId(e.target.value);
  },
  handleNameChange(e) {
    this.props.changeName(e.target.value);
  },
  handleDescriptionChange(e) {
    this.props.changeDesc(e.target.value);
  },

  handleSubmit(e) {
    e.preventDefault();

    const trimmed = {
      id: this.props.id.trim(),
      name: this.props.name.trim(),
      description: this.props.desc.trim()
    };

    if (!reg.test(trimmed.id)) {
      alert('ID는 정규식 "^[a-zA-Z_][a-zA-Z0-9_]+$"에 맞아야 합니다.');
      return false;
    }

    if (trimmed.name === '' || trimmed.description === '') {
      alert('양식을 모두 채워주세요.');
      return false;
    }

    DataCon.postDataToServer(this.props.url, 'POST', trimmed).then(() => {
      alert('프로필 생성에 성공하였습니다.');
      this.props.updateFollowingList();
      browserHistory.push(`/${trimmed.id}`);
    }).catch(console.error); // TODO: 중복 id등의 예외처리
  },

  render() {
    return (
      <div className="profileForm">
        <form onSubmit={this.handleSubmit}>
          ID: <input type="text" name="id" value={this.props.id} onChange={this.handleIdChange}/> <br/>
          이름: <input type="text" name="name" value={this.props.name} onChange={this.handleNameChange}/> <br/>
          설명: <input type="text" name="description" value={this.props.desc} onChange={this.handleDescriptionChange}/> <br/>
          <input type="submit" value="그룹 만들기"/>
        </form>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    id: state.profileForm.id,
    name: state.profileForm.name,
    desc: state.profileForm.desc
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    changeId: data => {
      dispatch(changeId(data));
    },
    changeName: data => {
      dispatch(changeName(data));
    },
    changeDesc: data => {
      dispatch(changeDesc(data));
    },
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMakeForm);
