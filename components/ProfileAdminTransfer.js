import React from 'react';

import {ProfileAdminTransferBox} from './boxes';

const ProfileAdminTransfer = React.createClass({
  render() {
    return <ProfileAdminTransferBox id={this.props.params.id}/>;
  }
});

export default ProfileAdminTransfer;
