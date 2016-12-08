import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {UserLevel} from '../../utils';

const SearchBox = React.createClass({
  render() {
    return (
      <li><form method="POST">
        <input type="text" name="search" placeholder="snucse검색"/>
        <input type="submit" value="검색"/>
      </form></li>
    );
  }
});

const TopMenu = React.createClass({
  handleLogout() {
    localStorage.removeItem('snucsesession');
    location.href = '/login';
  },

  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR:
        return (
          <div className="top-menu">
            <ul>
              <li><Link to="/"><img src="http://www.snucse.org/image/logo.png"/></Link></li>
              <SearchBox/>
              <li><Link to="/message"><span className="menulink">쪽지</span></Link></li>
              <li><Link to="/others"><span className="menulink">기타</span></Link></li>
              <li><a className="menulink" href="#" onClick={this.handleLogout}>로그아웃</a></li>
            </ul>
          </div>
        );

      default:
        return (
          <div className="top-menu">
            <ul>
              <li><Link to="/"><img src="http://www.snucse.org/image/logo.png"/></Link></li>
              <li><Link to="/message"><span className="menulink">쪽지</span></Link></li>
              <li><Link to="/others"><span className="menulink">기타</span></Link></li>
              <li><a className="menulink" href="#" onClick={this.handleLogout}>로그아웃</a></li>
            </ul>
          </div>
        );
    }
  }
});

function mapStateToProps(state) {
  return {
    userLevel: state.userInfo.userLevel
  };
}

export default connect(mapStateToProps)(TopMenu);
