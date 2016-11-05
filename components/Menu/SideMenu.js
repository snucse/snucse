import React from 'react';
import {Link} from 'react-router';

import TagCloud from '../TagCloud';
import FollowingProfileList from './FollowingProfileList';

const SideMenu = React.createClass({
  render() {
    return (
      <div className="side-menu">
        <h1>User Info</h1>
        <Link to="/profiles">전체그룹</Link>
        <ul>
          <li className="my-profiles">팔로우 중인 그룹</li>
          <FollowingProfileList/>
        </ul>
        <TagCloud/>
      </div>
    );
  }
});

export default SideMenu;
