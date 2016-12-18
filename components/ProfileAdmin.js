import React from 'react';

import {ProfileAdminBox} from './boxes/ProfileBox';

const ProfileAdmin = React.createClass({
  render() {
    const {id} = this.props.params;
    return <ProfileAdminBox id={id}/>;
  }
});

export default ProfileAdmin;
