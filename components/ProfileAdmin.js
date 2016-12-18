import React from 'react';

import {ProfileBoxContainer} from './boxes/ProfileBox';

const ProfileAdmin = React.createClass({
  render() {
    const {id} = this.props.params;
    return <ProfileBoxContainer id={id}/>;
  }
});

export default ProfileAdmin;
