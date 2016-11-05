import React from 'react';
import {connect} from 'react-redux';

import {DataCon, Url} from '../../utils';
import {loadUserId} from '../../actions';
import '../../stylesheets/menu.styl';

import TopMenu from './TopMenu';
import SideMenu from './SideMenu';

const Menu = React.createClass({
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
    putUserId: userId => dispatch(loadUserId(userId))
  };
};

export default connect(null, mapDispatchToProps)(Menu);
