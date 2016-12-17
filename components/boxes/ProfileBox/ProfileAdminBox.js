import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {initProfileAdminError, loadProfileDetail, changeAdmin} from '../../../actions/dispatchers';
import ProfileAdminForm from './ProfileAdminForm';
import ProfileAdminError from './ProfileAdminError';

const ProfileAdminBox = React.createClass({
  componentDidMount() {
    this.props.initProfileAdminError();
    this.props.loadProfileDetail(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id) {
      this.props.initProfileAdminError();
      this.props.loadProfileDetail(props.id);
    }
  },

  handleClickSubmit(newId) {
    if (confirm('관리자를 변경하시겠습니까?')) {
      this.props.changeAdmin(this.props.id, newId);
    }
  },

  render() {
    const {admin, userId, notAdmin, invalidId} = this.props;
    if (!admin) {
      return <div className="profile-admin">Loading...</div>;
    }

    const mine = (userId === admin.id);

    if (!mine) {
      return (
        <div className="profile-admin">
          관리자가 아닙니다.
          <Link to={`/${this.props.id}`}>프로필로 돌아가기</Link>
        </div>
      );
    }

    return (
      <div className="profile-admin">
        <ProfileAdminForm onClickSubmit={this.handleClickSubmit}/>
        <ProfileAdminError notAdmin={notAdmin} invalidId={invalidId}/>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  const {notAdmin, invalidId} = state.profileAdmin;
  return {
    userId: state.userInfo.userId,
    admin: state.profile.current.admin,
    notAdmin,
    invalidId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    initProfileAdminError: () => initProfileAdminError(dispatch),
    loadProfileDetail: id => loadProfileDetail(dispatch, id),
    changeAdmin: (id, newId) => changeAdmin(dispatch, id, newId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdminBox);
