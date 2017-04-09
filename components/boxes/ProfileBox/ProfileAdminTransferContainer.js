import React from 'react';
import {Link} from 'react-router-dom';

/*
 * props
 * - id
 * - admin
 * - mine
 */

const ProfileAdminTransferContainer = React.createClass({
  render() {
    const {id, admin, mine} = this.props;
    if (!admin) {
      return null;
    }

    const adminLink = (mine === true) ? (
      <Link id="profile-admin-transfer-button" to={`/profiles/${id}/transfer_admin`}>관리자 변경</Link>
    ) : (
      null
    );

    return (
      <div className="form-group">
        <strong id="profile-admin-transfer-label">관리자 변경</strong>
        관리자를 다른 사용자로 변경하면 버튼을 클릭하세요. {adminLink}
      </div>
    );
  }
});

export default ProfileAdminTransferContainer;
