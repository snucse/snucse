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

  componentDidMount() {
    const updateNow = () => {
      console.log(this.state);
      moment.locale('ko');
      this.setState({
        fromNow: this.props.from.fromNow()
      });
    };

    const updater = setInterval(updateNow, this.props.updateInterval || 10000);
    this.setState({
      updateNow,
      updater
    });
  },

  componentWillUnmount() {
    clearInterval(this.state.updater);
  },

  componentWillReceiveProps(props) {
    if (this.props.timestamp !== props.timestamp) {
      this.state.updateNow(); // for force update?
    }
  },

  render() {
    return <div className="time">{this.state.fromNow}</div>;
  }
});

const mapStateToProps = function (state) {
  return {
    timestamp: state.realtime.timestamp
  };
};

export default connect(mapStateToProps)(Realtime);
