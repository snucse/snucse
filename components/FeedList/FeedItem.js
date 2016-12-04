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
        return <FeedArticle article={this.props.data}/>;
      case 'loadmore':
        return <FeedLoadMore onLoadMore={this.handleLoadMore} options={this.props.data.options} automatic={this.props.data.automatic}/>;
      default:
        return null;
    }
  }
});

export default FeedItem;
