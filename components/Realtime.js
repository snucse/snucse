import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

/*
 * props
 * - from
 */

const Realtime = React.createClass({
  getInitialState() {
    moment.locale('ko');
    return {
      fromNow: this.props.from.fromNow()
    };
  },

  updateNow() {
    moment.locale('ko');
    this.setState({
      fromNow: this.props.from.fromNow()
    });
  },

  componentDidMount() {
    this.setState({
      updater: setInterval(this.updateNow, this.props.updateInterval)
    });
  },

  componentWillUnmount() {
    clearInterval(this.state.updater);
  },

  componentWillReceiveProps(props) {
    if (this.props.timestamp !== props.timestamp) {
      this.updateNow();
    }
  },

  render() {
    moment.locale('ko');
    return <div className="time">{this.state.fromNow}</div>;
  }
});

const mapStateToProps = function (state) {
  timestamp: state.realtime.timestamp
};

export default connect(mapStateToProps)(Realtime);
