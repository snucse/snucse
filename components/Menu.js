import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import MyProfile from './MyProfiles.js';

var Menu = React.createClass({
  logout: function() {
    localStorage.removeItem('snucsesession');
    location.href = '/login';
  },

  render: function() {
    var user_id = 1;
    return (
      <div>
        <div className="Menu">
          <div className="Top_menu">
            <ul>
              <li><Link to="/"><img src="http://www.snucse.org/image/logo.png" /></Link></li>
              <li><form method="POST">
                <input type="text" name="search" placeholder="snucse검색" />
                <input type="submit" value="검색" />
              </form></li>
              <li><Link to="/message" className="menulink">쪽지</Link></li>
              <li><Link to="/others" className="menulink">기타</Link></li>
              <li><a className="menulink" href="#" onClick={this.logout}>로그아웃</a></li>
            </ul>
          </div>
          <div className="Side_menu">
            <h1>User Info</h1>
            <Link to="/profiles">전체그룹</Link>
            <ul>
              <li className="MyProfiles">내 그룹</li>
              <MyProfile url={this.props.route.url+"profiles/following?current_user_id="+user_id} />
            </ul>
          </div>
        </div>
        <div className="Content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Menu;
