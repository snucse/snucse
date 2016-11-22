import React from 'react';
import {connect} from 'react-redux';

import {loadFeed, loadMoreFeed} from '../actions/dispatchers';
import FeedList from './FeedList';

const Feed = React.createClass({
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadFeed();
  },

  handleLoadMore() {
    if (this.props.loading === true) {
      return;
    }
    this.props.loadMoreFeed(this.props.feeds.length, this.props.feedNum);
  },

  render() {
    const feeds = this.props.feeds.slice(0, this.props.feedNum);
    if (this.props.feeds.length > this.props.feedNum) {
      feeds.push({
        type: 'loadmore',
        id: `${this.props.feedNum}`,
        automatic: true
      });
    }
    return (
      <FeedList feeds={feeds} onLoadMore={this.handleLoadMore}/>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    feeds: state.feeds.feeds,
    feedNum: state.feeds.count,
    loading: state.feeds.loading
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadFeed: () => loadFeed(dispatch),
    loadMoreFeed: (...args) =>
      loadMoreFeed(dispatch, ...args)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
