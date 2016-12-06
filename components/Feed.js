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
    return (
      <FeedList feeds={this.props.feeds} onLoadMore={this.handleLoadMore}/>
    );
  }
});

function bs(arr, val, start, end) {
  start = start || 0;
  if (end == null) {
    end = arr.length;
  }
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] === val) {
    return mid;
  }
  if (end - start <= 1) {
    return -1;
  }

  // 내림차순 정렬된 데이터 검색
  if (arr[mid] < val) {
    return bs(arr, val, start, mid);
  }
  return bs(arr, val, mid, end);
}

const mapStateToProps = function (state) {
  const feeds = state.feeds.allIds.map(id => state.feeds.byId[id]);
  const refreshSince = (feeds.length > 0 ? feeds[0].id : undefined);
  let p = 0;
  for (const metadata of state.feeds.loadMore) {
    const targetId = metadata.maxId + 1;
    const idx = bs(state.feeds.allIds, targetId);
    if (idx !== -1) {
      feeds.splice(idx + 1 + p, 0, {
        id: JSON.stringify(metadata),
        type: 'loadmore',
        automatic: false,
        options: metadata
      });
      p++;
    }
  }
  const refreshMetadata = {
    sinceId: refreshSince,
    limit: 5
  };
  feeds.unshift({
    id: JSON.stringify(refreshMetadata),
    type: 'loadmore',
    automatic: false,
    options: refreshMetadata
  });
  return {
    feeds
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadFeed: options => loadFeed(dispatch, options)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
