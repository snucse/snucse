import React from 'react';
import {connect} from 'react-redux';

import ProfileNameContainer from './ProfileNameContainer';
import ProfileDescContainer from './ProfileDescContainer';

const ProfileBox = React.createClass({
  render() {
    if (this.props.loaded === false) {
      return (
        <div className="profile-box"/>
      );
    }

    const {userId, id, name, description, admin} = this.props;
    const mine = (admin && userId === admin.id);
    return (
      <div className="profile-box">
        <ProfileNameContainer id={id} name={name} mine={mine}/>
        <ProfileDescContainer id={id} desc={description} mine={mine}/>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  const {name, description, admin} = state.profile.current;
  const {userId} = state.userInfo;
  return {
    loaded: state.profile.loaded,
    name,
    description,
    admin,
    userId
  };
};

export default connect(mapStateToProps)(ProfileBox);
