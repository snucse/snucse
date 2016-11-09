import React from 'react';
import {connect} from 'react-redux';

import {loadUserId} from '../../actions/dispatchers';
import '../../stylesheets/menu.styl';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

const Menu = React.createClass({
  componentDidMount() {
    this.props.loadUserId();
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
    loadUserId: () => loadUserId(dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Menu);
