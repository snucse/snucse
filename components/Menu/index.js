import React from 'react';
import {connect} from 'react-redux';
import Measure from 'react-measure';

import {loadUserInfo, updateAppDimensions} from '../../actions/dispatchers';
import '../../stylesheets/menu.styl';
import Modal from '../Modal';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

const Menu = React.createClass({
  componentDidMount() {
    this.props.loadUserInfo();
  },

  handleMeasure(dimensions) {
    this.props.updateAppDimensions(dimensions);
  },

  render() {
    const modal = this.props.modalEnabled ? <Modal/> : null;
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
          {modal}
        </div>
      </Measure>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    modalEnabled: state.modal.enabled
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadUserInfo: () => loadUserInfo(dispatch),
    updateAppDimensions: dimensions => updateAppDimensions(dispatch, dimensions)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
