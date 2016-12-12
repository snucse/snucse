import React from 'react';
import {connect} from 'react-redux';

import {loadUserInfo} from '../../actions/dispatchers';
import '../../stylesheets/menu.styl';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

const Menu = React.createClass({
  componentDidMount() {
    this.props.loadUserInfo();
  },

  render() {
    return (
      <div>
        <div className="menu">
          <TopMenu/>
          <SideMenu/>
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
    loadUserInfo: () => loadUserInfo(dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Menu);
