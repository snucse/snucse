import React from 'react';
import {Link} from 'react-router';
import {DataCon} from '../utils';

const MyProfile = React.createClass({
  loadProfilefromServer() {
    const {url} = this.props;
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
        <li key={`${profile.id}${profile.name}`}><Link to={`/${profile.sid}`}>{profile.name}</Link></li>
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
