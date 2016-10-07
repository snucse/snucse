import React from 'react';
import {Link} from 'react-router';
import MyProfile from './MyProfiles.js';

const Menu = React.createClass({
  handleLogout() {
    localStorage.removeItem('snucsesession');
    location.href = '/login';
  },

  render() {
    const userId = 1;
    return (
      <div>
        <div className="Menu">
          <div className="Top_menu">
            <ul>
              <li><Link to="/"><img src="http://www.snucse.org/image/logo.png"/></Link></li>
              <li><form method="POST">
                <input type="text" name="search" placeholder="snucse검색"/>
                <input type="submit" value="검색"/>
              </form></li>
              <li><Link to="/message"><span className="menulink">쪽지</span></Link></li>
              <li><Link to="/others"><span className="menulink">기타</span></Link></li>
              <li><a className="menulink" href="#" onClick={this.handleLogout}>로그아웃</a></li>
            </ul>
          </div>
          <div className="Side_menu">
            <h1>User Info</h1>
            <Link to="/profiles">전체그룹</Link>
            <ul>
              <li className="MyProfiles">내 그룹</li>
              <MyProfile url={`${this.props.route.url}profiles/following?current_user_id=${userId}`}/>
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
