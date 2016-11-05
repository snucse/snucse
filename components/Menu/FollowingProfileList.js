import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {updateFollowingList} from '../../actions/dispatchers';

const FollowingProfileList = React.createClass({
  componentDidMount() {
    this.props.updateFollowingList();
  },

  render() {
    const profiles = this.props.me.following.map(profile => {
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

const mapStateToProps = function (state) {
  return {
    me: state.me
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingProfileList);
