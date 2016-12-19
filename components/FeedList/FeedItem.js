import React from 'react';

import FeedArticle from './FeedArticle';
import FeedLoadMore from './FeedLoadMore';

// Props:
// - type: 'article', data: any
// - type: 'loadmore', automatic: boolean, options: {
//     maxId?: number, sinceId?: number
//   }
const FeedItem = React.createClass({
  handleLoadMore(options) {
    this.props.onLoadMore(options);
  },

  render() {
    const {type} = this.props;
    switch (type) {
      case 'article':
        return <FeedArticle article={this.props.data} onArticleDelete={this.props.onArticleDelete}/>;
      case 'loadmore':
        return <FeedLoadMore onLoadMore={this.handleLoadMore} options={this.props.data.options}/>;
      default:
        return null;
    }
  }
});

export default FeedItem;
