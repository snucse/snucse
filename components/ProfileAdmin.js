import React from 'react';
import {connect} from 'react-redux';

import {loadProfileDetail} from '../actions/dispatchers';
import {ProfileAdminTransferContainer, ProfileEditBoxContainer} from './boxes';

const ProfileAdmin = React.createClass({
  componentDidMount() {
    this.props.loadProfileDetail(this.props.params.id);
  },

  componentWillReceiveProps(props) {
    if (this.props.params.id !== props.params.id) {
      this.props.loadProfileDetail(props.params.id);
    }
  },

  render() {
    const {id} = this.props.params;
    const {name, description, admin, userId} = this.props;
    const mine = admin && (admin.id === userId);
    return (
      <div className="profile-admin">
        <ProfileAdminTransferContainer id={id} admin={admin} mine={mine}/>
        <ProfileEditBoxContainer id={id} name={name} description={description} mine={mine}/>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  const {name, description, admin} = state.profile.current;
  const {userId} = state.userInfo;
  return {
    name,
    description,
    admin,
    userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadProfileDetail: id => loadProfileDetail(dispatch, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdmin);
