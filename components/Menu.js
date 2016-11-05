import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {DataCon, Url} from '../utils';
import {loadUserId} from '../actions';
import '../stylesheets/menu.styl';
import MyProfile from './MyProfile';
import TagCloud from './TagCloud';

const Menu = React.createClass({
  handleLogout() {
    localStorage.removeItem('snucsesession');
    location.href = '/login';
  },

  getUserId() {
    const url = Url.getUrl('users/me');
    DataCon.loadDataFromServer(url).then(data => {
      this.props.putUserId(data.id);
    }).catch(console.error);
  },

  componentDidMount() {
    this.getUserId();
  },

  render() {
    return (
      <div>
        <div className="menu">
          <div className="top-menu">
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
          <div className="side-menu">
            <h1>User Info</h1>
            <Link to="/profiles">전체그룹</Link>
            <ul>
              <li className="my-profiles">내 그룹</li>
              <MyProfile/>
            </ul>
            <TagCloud/>
          </div>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    putUserId: userId => dispatch(loadUserId(userId))
  };
};

export default connect(null, mapDispatchToProps)(Menu);
