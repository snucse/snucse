import React from 'react';
import {Link} from 'react-router';
import {DataCon} from '../utils';
import ProfileMakeForm from './ProfileMakeForm.js';

const Profiles = React.createClass({
  loadProfilesFromServer() {
    DataCon.loadDataFromServer(this.props.route.url).then(data => {
      this.setState({data});
    }).catch(console.error);
  },

  componentDidMount() {
    this.loadProfilesFromServer();
  },

  getInitialState() {
    return {data: {profiles: []}};
  },

  render() {
    const profiles = this.state.data.profiles.map(profile => {
      return (
        <div key={profile.id} className="profile">
          <Link to={`/${profile.id}`}><strong>{profile.name}</strong></Link>
        </div>
      );
    });
    return (
      <div className="profile container">
        <ProfileMakeForm url={this.props.route.url}/>
        <div className="profiles">
          {profiles}
        </div>
      </div>
    );
  }
});

export default Profiles;
