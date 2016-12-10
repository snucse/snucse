import React from 'react';
import {connect} from 'react-redux';

import {loadUserInfo} from '../../actions/dispatchers';
import '../../stylesheets/menu.styl';
import Modal from '../Modal';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

const Menu = React.createClass({
  componentDidMount() {
    this.props.loadUserInfo();
  },

  render() {
    return (
      <div>
        <TopMenu/>
        <div id="main-container">
          <SideMenu/>
          <div id="main">
            {this.props.children}
          </div>
        </div>
        <Modal/>
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
