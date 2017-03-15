import React from 'react';

import ProfileImageSettingBox from './ProfileImageSettingBox';
import ChangePasswordBox from './ChangePasswordBox';

import '../../stylesheets/settings.styl';

const Settings = React.createClass({
  render() {
    return (
      <div id="settings">
        <h5 id="settings-title">정보 변경</h5>
        <ProfileImageSettingBox/>
        <br/>
        <ChangePasswordBox/>
      </div>
    );
  }
});

export default Settings;
