import React from 'react';
import {connect} from 'react-redux';
import Measure from 'react-measure';

import {loadUserInfo, updatesAppDimensions} from '../../actions/dispatchers';
import '../../stylesheets/menu.styl';
import Modal from '../Modal';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

const Menu = React.createClass({
  componentDidMount() {
    this.props.loadUserInfo();
  },

  handleMeasure(dimensions) {
    this.props.updatesAppDimensions(dimensions);
  },

  render() {
    return (
      <Measure onMeasure={this.handleMeasure}>
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
      </Measure>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    loadUserInfo: () => loadUserInfo(dispatch),
    updatesAppDimensions: dimensions => updatesAppDimensions(dispatch, dimensions)
  };
};

export default connect(null, mapDispatchToProps)(Menu);
