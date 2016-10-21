import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {DataCon, genRefCallback} from '../utils';
import {updateFollowingList} from '../actions/dispatchers';

const reg = /^[a-zA-Z_][a-zA-Z0-9_]+$/;

const ProfileMakeForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    const trimmed = {
      id: this.formId.value.trim(),
      name: this.formName.value.trim(),
      description: this.formDesc.value.trim()
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
      <div className="profile-form">
        <form onSubmit={this.handleSubmit}>
          ID: <input
            type="text" name="id"
            ref={genRefCallback(this, 'formId')}
            /> <br/>
          이름: <input
            type="text" name="name"
            ref={genRefCallback(this, 'formName')}
            /> <br/>
          설명: <input
            type="text" name="description"
            ref={genRefCallback(this, 'formDesc')}
            /> <br/>
          <input type="submit" value="그룹 만들기"/>
        </form>
      </div>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(() => {
  return {};
}, mapDispatchToProps)(ProfileMakeForm);
