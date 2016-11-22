import React from 'react';

import ProfileTagList from './ProfileTagList';
import ProfileTagFormContainer from './ProfileTagFormContainer';

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
