import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

/*
 * props
 * - from
 */

const Realtime = React.createClass({
  render() {
    moment.locale('ko');
    const {timestamp, from} = this.props;
    return <div className="time">{from.from(timestamp)}</div>;
  }
});

const mapStateToProps = function (state) {
  return {
    timestamp: state.realtime.timestamp
  };
};

export default connect(mapStateToProps)(Realtime);
