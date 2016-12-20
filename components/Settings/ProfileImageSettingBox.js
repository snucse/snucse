import React from 'react';

import {DataCon, Url, connectModals} from '../../utils';

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

    const url = Url.getUrl('/users/profile_image');
    DataCon.postFormDataToServer(url, 'POST', {image: file})
      .then(() => {
        this.props.alertModal('알림', '변경되었습니다.');
        // TODO: reload profile images
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

export default connectModals(ProfileImageSettingBox);
