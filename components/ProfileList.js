import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {DataCon, Url} from '../utils';
import {loadProfiles} from '../actions/profilesListAction';
import ProfileMakeForm from './ProfileMakeForm';

const ProfileList = React.createClass({
  loadProfilesFromServer() {
    DataCon.loadDataFromServer(Url.getUrl('profiles'))
      .then(this.props.onProfilesLoad)
      .catch(console.error);
  },

  componentDidMount() {
    this.loadProfilesFromServer();
  },

  render() {
    const profiles = this.props.data.profiles.map(profile => {
      return (
        <div key={profile.id} className="profile">
          <Link to={`/${profile.id}`}>{profile.name}</Link>
        </div>
      );
    });
    return (
      <div className="profile-container">
        <ProfileMakeForm/>
        <div className="profiles">
          {profiles}
        </div>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    data: state.profileList.data
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onProfilesLoad(data) {
      dispatch(loadProfiles(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
