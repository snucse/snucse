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
        <FeedItem type={feed.type} data={feed} onLoadMore={this.handleLoadMore} onArticleDelete={this.props.onArticleDelete} key={`feeditem-${feed.type}-${feed.id}`}/>
      );
    });
    return (
      <ul id="feed-list">
        {feedNodes}
      </ul>
    );
  }
});

export default FeedList;
