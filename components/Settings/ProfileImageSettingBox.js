import React from 'react';
import {connect} from 'react-redux';

import {connectModals} from '../../utils';
import {updateProfileImage} from '../../actions/dispatchers';

const ProfileImageSettingBox = React.createClass({
  getInitialState() {
    return {
      file: undefined
    };
  },

  handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) {
      this.props.alertModal('알림', '파일을 선택해주세요.');
      return;
    }

    this.props.updateProfileImage(file).then(() => {
      this.props.alertModal('알림', '변경되었습니다.');
    });
  },

  render() {
    return (
      <div>
        <div className="form-group">
          <label className="form-label" htmlFor="settings-profile-image-input">프로필 사진</label>
          <label id="settings-profile-image-input-container">
            파일 선택
            <input id="settings-profile-image-input" type="file" accept="image/*" onChange={this.handleFileChange}/>
          </label>
        </div>
      </div>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateProfileImage: image => updateProfileImage(dispatch, image)
  };
};

export default connectModals(connect(null, mapDispatchToProps)(ProfileImageSettingBox));
