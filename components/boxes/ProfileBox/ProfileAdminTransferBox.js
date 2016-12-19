import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {connectModals} from '../../../utils';
import {loadProfileDetail, changeAdmin} from '../../../actions/dispatchers';
import ProfileAdminTransferForm from './ProfileAdminTransferForm';

/*
 * props
 * - id
 */

const ProfileAdminTransferBox = React.createClass({
  componentDidMount() {
    this.props.loadProfileDetail(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id) {
      this.props.loadProfileDetail(props.id);
    }
  },

  handleClickSubmit(newId) {
    this.props.confirmModal('알림', '관리자를 변경하시겠습니까?', () => {
      this.props.changeAdmin(this.props.id, newId);
    });
  },

  render() {
    const {admin, userId} = this.props;
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
        <ProfileAdminTransferForm onClickSubmit={this.handleClickSubmit}/>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userInfo.userId,
    admin: state.profile.current.admin
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadProfileDetail: id => loadProfileDetail(dispatch, id),
    changeAdmin: (id, newId) => changeAdmin(dispatch, id, newId)
  };
};

export default connectModals(connect(mapStateToProps, mapDispatchToProps)(ProfileAdminTransferBox));
