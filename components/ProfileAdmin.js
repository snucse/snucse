import React from 'react';
import {connect} from 'react-redux';

import {loadProfileDetail, clearProfileDetail} from '../actions/dispatchers';
import {ProfileAdminTransferContainer, ProfileEditBoxContainer} from './boxes';

import '../stylesheets/profile.styl';

const ProfileAdmin = React.createClass({
  componentDidMount() {
    this.props.loadProfileDetail(this.props.match.params.id);
  },

  componentWillReceiveProps(props) {
    if (this.props.match.params.id !== props.match.params.id) {
      this.props.loadProfileDetail(props.match.params.id);
    }
  },

  render() {
    const {id} = this.props.match.params;
    const {name, description, renderingMode, admin, userId} = this.props;
    const mine = admin && (admin.id === userId);
    return (
      <div id="profile-admin">
        <h5 id="profile-admin-title">프로필 관리</h5>
        <ProfileAdminTransferContainer id={id} admin={admin} mine={mine}/>
        <ProfileEditBoxContainer id={id} name={name} description={description} mine={mine} renderingMode={renderingMode}/>
      </div>
    );
  },

  componentWillUnmount() {
    this.props.clearProfileDetail();
  }
});

const mapStateToProps = function (state) {
  const {name, description, renderingMode, admin} = state.profile.current;
  const {userId} = state.userInfo;
  return {
    name,
    description,
    renderingMode,
    admin,
    userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    clearProfileDetail: () => clearProfileDetail(dispatch),
    loadProfileDetail: id => loadProfileDetail(dispatch, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdmin);
