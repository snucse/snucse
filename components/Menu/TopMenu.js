import React from 'react';
import {Link} from 'react-router-dom';
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
              <a
                id="top-menu-github-link"
                href="https://github.com/snucse/snucse"
                target="_blank"
                rel="noopener noreferrer"
                >
                GitHub
              </a>
              <a id="logout-link" href="#" onClick={this.handleLogout}>로그아웃</a>
              <Link id="top-menu-activity-button" to={`/activities`}>활동</Link>
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
              <a
                id="top-menu-github-link"
                href="https://github.com/snucse/snucse"
                target="_blank"
                rel="noopener noreferrer"
                >
                GitHub
              </a>
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
