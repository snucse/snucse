import React from 'react';

import FeedArticle from './FeedArticle';
import FeedLoadMore from './FeedLoadMore';

// Props: {type: string, data: any}
const FeedItem = React.createClass({
  render() {
    const {type} = this.props;
    switch (type) {
      case 'article':
        return <FeedArticle article={this.props.data}/>;
      case 'loadmore':
        return <FeedLoadMore automatic={this.props.automatic}/>;
      default:
        return null;
    }
  }
});

export default FeedItem;
