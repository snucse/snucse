import React from 'react';
import {connect} from 'react-redux';

import {loadFeed} from '../actions/dispatchers';
import FeedList from './FeedList';

const Feed = React.createClass({
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadFeed({profileId: this.props.profileId});
  },

  componentWillReceiveProps(props) {
    if (props.profileId !== this.props.profileId) {
      window.scrollTo(0, 0);
      props.loadFeed({profileId: props.profileId});
    }
  },

  handleLoadMore(options) {
    this.props.loadFeed({...options, profileId: this.props.profileId});
  },

  render() {
    const {byId, allIds, loadMore, resetLoading} = this.props;
    const refreshSince = (allIds.length > 0 ? allIds[0] : undefined);

    // O(n + m)
    const rawFeeds = allIds.map(id => byId[id]);
    const feedLoadMore = loadMore.map(metadata => {
      return {
        id: metadata.maxId + 1,
        type: 'loadmore',
        options: metadata
      };
    });
    // O((n+m)lg(n+m))
    const feeds = [...rawFeeds, ...feedLoadMore].sort((a, b) => {
      if (a.id !== b.id) {
        return b.id - a.id;
      }
      if (a.type !== 'loadmore' && b.type !== 'loadmore') {
        return 0;
      }
      if (a.type === 'loadmore') {
        return 1;
      }
      return -1;
    });
    // O(1)? O(n)?
    if (!resetLoading) {
      feeds.unshift({
        id: 'refresh',
        type: 'loadmore',
        options: {
          sinceId: refreshSince,
          limit: 5
        }
      });
    }
    // total O((n+m)lg(n+m))
    return (
      <FeedList feeds={feeds} onLoadMore={this.handleLoadMore}/>
    );
  }
});

const mapStateToProps = function (state) {
  return {...state.feeds};
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadFeed: options => loadFeed(dispatch, options)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
