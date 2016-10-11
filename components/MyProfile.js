import React from 'react';
import {Link} from 'react-router';
import {DataCon, Url} from '../utils';

const MyProfile = React.createClass({
  loadProfilefromServer() {
    const url = Url.getUrl('profiles/following');
    DataCon.loadDataFromServer(url).then(data => {
      this.setState({data});
    }).catch(console.error);
  },

  getInitialState() {
    return {data: {profiles: []}};
  },

  componentDidMount() {
    this.loadProfilefromServer();
  },

  render() {
    const profiles = this.state.data.profiles.map(profile => {
      return (
        <li key={`${profile.id}${profile.name}`}><Link to={`/${profile.id}`}>{profile.name}</Link></li>
      );
    });

    return (
      <ul>
        {profiles}
      </ul>
    );
  }
});

export default MyProfile;
