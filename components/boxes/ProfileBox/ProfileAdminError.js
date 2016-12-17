import React from 'react';

const ProfileAdminError = React.createClass({
  render() {
    const {notAdmin, invalidId} = this.props;

    if (notAdmin) {
      return <div className="profile-admin-error">관리자가 아닙니다.</div>;
    } else if (invalidId) {
      return <div className="profile-admin-error">해당하는 id를 찾을 수 없습니다.</div>;
    }
    return null;
  }
});

export default ProfileAdminError;
