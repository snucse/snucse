import React from 'react';

import ProfileTagList from './ProfileTagList.js';
import ProfileTagFormContainer from './ProfileTagFormContainer.js';

const ProfileTagBox = React.createClass({
  render() {
    return (
      <div className="tag-wrapper">
        <ProfileTagList profileId={this.props.profileId}/>
        <ProfileTagFormContainer profileId={this.props.profileId}/>
      </div>
    );
  }
});

export default ProfileTagBox;
