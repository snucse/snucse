import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {DataCon, Url, genRefCallback, connectModals} from '../../utils';
import {updateFollowingList, alertModal} from '../../actions/dispatchers';

import Editor from '../Editor';
import '../../stylesheets/profile-new.styl';

const reg = /^[a-zA-Z_][a-zA-Z0-9_]+$/;

const ProfileMakeForm = React.createClass({
  getInitialState() {
    return {
      renderingMode: 'md',
      description: ''
    };
  },

  handleDescChange(value) {
    this.setState({
      description: value
    });
  },

  handleModeChange(mode) {
    this.setState({
      renderingMode: mode
    });
  },

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      id: this.formId.value.trim(),
      name: this.formName.value.trim(),
      description: this.state.description,
      renderingMode: this.state.renderingMode
    };

    if (!reg.test(data.id)) {
      this.props.alertModal('알림', 'ID는 정규식 "^[a-zA-Z_][a-zA-Z0-9_]+$"에 맞아야 합니다.');
      return false;
    }

    if (data.name === '' || data.description === '') {
      this.props.alertModal('알림', '양식을 모두 채워주세요.');
      return false;
    }

    this.props.updateProfile(data);
  },

  render() {
    return (
      <div id="create-profile-form-box">
        <h5 id="create-profile-form-title">새 프로필 만들기</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="create-profile-form-id-input">ID</label>
            <input
              id="create-profile-form-id-input"
              className="form-input"
              type="text" name="id"
              ref={genRefCallback(this, 'formId')}
              />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="create-profile-form-name-input">이름</label>
            <input
              id="create-profile-form-name-input"
              className="form-input"
              type="text" name="name"
              ref={genRefCallback(this, 'formName')}
              />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="create-profile-form-description-input">설명</label>
            <Editor onChange={this.handleDescChange} onModeChange={this.handleModeChange}/>
          </div>
          <input id="create-profile-button" type="submit" value="그룹 만들기"/>
        </form>
      </div>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateProfile: data => {
      const url = Url.getUrl('/profiles');
      DataCon.postDataToServer(url, 'POST', data).then(() => {
        alertModal(dispatch, '알림', '프로필 생성에 성공하였습니다.');
        updateFollowingList(dispatch);
        dispatch(push(`/${data.id}`));
      }).catch(() => {
        alertModal(dispatch, '알림', 'ID가 중복되었습니다.');
      });
    }
  };
};

export default connectModals(connect(null, mapDispatchToProps)(ProfileMakeForm));
