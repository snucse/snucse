import React from 'react';
import {connect} from 'react-redux';
import {updateTimes} from '../actions/dispatchers';

const TimeManager = React.createClass({
  render() {
    return <div>{this.props.children}</div>;
  },

  componentDidMount() {
    setInterval(this.props.updateTimes, 1000 * 30);
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateTimes: () => updateTimes(dispatch)
  };
};

export default connect(null, mapDispatchToProps)(TimeManager);
