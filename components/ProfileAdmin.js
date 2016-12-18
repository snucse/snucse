import React from 'react';

import {ProfileBox} from './boxes/ProfileBox';

const ProfileAdmin = React.createClass({
  render() {
    const {id} = this.props.params;
    return <ProfileBox id={id}/>;
  }
});

export default ProfileAdmin;
