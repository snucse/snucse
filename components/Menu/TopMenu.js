import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {UserLevel} from '../../utils';

const TopMenu = React.createClass({
  handleLogout() {
    localStorage.removeItem('snucsesession');
    location.href = '/login';
  },

  render() {
    const search = this.props.userLevel === UserLevel.REGULAR ? (
      <li><form method="POST">
        <input type="text" name="search" placeholder="snucse검색"/>
        <input type="submit" value="검색"/>
      </form></li>
    ) : null;

    return (
      <div className="top-menu">
        <ul>
          <li><Link to="/"><img src="http://www.snucse.org/image/logo.png"/></Link></li>
          {search}
          <li><Link to="/message"><span className="menulink">쪽지</span></Link></li>
          <li><Link to="/others"><span className="menulink">기타</span></Link></li>
          <li><a className="menulink" href="#" onClick={this.handleLogout}>로그아웃</a></li>
        </ul>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    userLevel: state.userInfo.userLevel
  };
}

export default connect(mapStateToProps)(TopMenu);
