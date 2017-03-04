import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {UserLevel} from '../../utils';
import {SearchFormTopMenu} from '../boxes';

const TopMenu = React.createClass({
  handleLogout() {
    localStorage.removeItem('snucsesession');
    location.href = '/login';
  },

  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR:
        return (
          <header id="header">
            <div id="header-container">
              <div id="logo-container">
                <Link id="logo" to="/">SNUCSE</Link>
              </div>
              <a id="logout-link" href="#" onClick={this.handleLogout}>로그아웃</a>
              <SearchFormTopMenu/>
            </div>
          </header>
        );

      default:
        return (
          <header id="header">
            <div id="header-container">
              <div id="logo-container">
                <Link id="logo" to="/">SNUCSE</Link>
              </div>
              <a id="logout-link" href="#" onClick={this.handleLogout}>로그아웃</a>
            </div>
          </header>
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
