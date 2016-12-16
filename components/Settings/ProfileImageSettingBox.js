import React from 'react';

import {DataCon, Url} from '../../utils';

const ProfileImageSettingBox = React.createClass({
  getInitialState() {
    return {
      file: undefined
    };
  },

  handleFileChange(file) {
    this.setState({file});
  },

  handleSubmit() {
    const {file} = this.state;

    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const url = Url.getUrl('/users/profile_image');
    DataCon.postDataFormToServer(url, 'POST', {image: file})
      .then(() => {
        alert('변경되었습니다.');
        // TODO: reload profile images
      });
  },

  render() {
    return (
      <div className="profile-image-setting-box">
        <input type="file" accept="image/*" onChange={this.handleFileChange}/>
        <button type="button" onClick={this.handleSubmit}>변경하기</button>
      </div>
    );
  }
});

export default ProfileImageSettingBox;
