import React from 'react';

import '../../stylesheets/article.styl';
import '../../stylesheets/tagbox.styl';
import FeedItem from './FeedItem';

const FeedList = React.createClass({
  onScroll() {
    // http://stackoverflow.com/questions/9439725
    const scrollHeight = document.documentElement ? document.documentElement.scrollHeight : document.body.scrollHeight;
    if (window.innerHeight + window.scrollY >= scrollHeight) {
      this.props.onLoadMore();
    }
  },

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  render() {
    const feedNodes = this.props.feeds.map(feed => {
      return (
        <FeedItem type={feed.type} data={feed} key={`feeditem-${feed.type}-${feed.id}`}/>
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
