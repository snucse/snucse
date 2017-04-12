import React from 'react';

import {ProfileAdminTransferBox} from './boxes';

const ProfileAdminTransfer = React.createClass({
  render() {
    return <ProfileAdminTransferBox id={this.props.match.params.id}/>;
  }
});

export default ProfileAdminTransfer;
