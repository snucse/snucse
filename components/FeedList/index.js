import React from 'react';

import '../../stylesheets/article.styl';
import '../../stylesheets/tagbox.styl';
import FeedItem from './FeedItem';

const FeedList = React.createClass({
  handleLoadMore(options) {
    this.props.onLoadMore(options);
  },

  render() {
    const feedNodes = this.props.feeds.map(feed => {
      return (
        <FeedItem type={feed.type} data={feed} onLoadMore={this.handleLoadMore} key={`feeditem-${feed.type}-${feed.id}`}/>
      );
    });
    return (
      <div className="article">
        {feedNodes}
      </div>
    );
  }
});

export default FeedList;
