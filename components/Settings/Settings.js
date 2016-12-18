import React from 'react';

import ProfileImageSettingBox from './ProfileImageSettingBox';

const Settings = React.createClass({
  render() {
    return (
      <div className="settings">
        프로필 사진 변경
        <ProfileImageSettingBox/>
      </div>
    );
  }
});

export default Settings;
