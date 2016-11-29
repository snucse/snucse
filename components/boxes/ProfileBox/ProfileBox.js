import React from 'react';
import {connect} from 'react-redux';

// import {ProfileDescContainer} from './ProfileDescContainer';
import ProfileNameContainer from './ProfileNameContainer';

const ProfileBox = React.createClass({
  render() {
    if (this.props.loaded === false) {
      return (
        <div className="profile-box"/>
      );
    }

    const {userId, id, name, admin} = this.props;
    const mine = (userId === admin.id);
    console.log(this.props, mine);
    return (
      <div className="profile-box">
        <ProfileNameContainer id={id} name={name} mine={mine}/>
      </div>
    );
  }
  // <ProfileDescContainer id={id} desc={description} mine={mine}/>
});

const mapStateToProps = function (state) {
  const {name, description, admin} = state.profile.current;
  return {
    loaded: state.profile.loaded,
    name,
    description,
    admin
  };
};

export default connect(mapStateToProps)(ProfileBox);
