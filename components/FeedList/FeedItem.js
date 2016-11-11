import React from 'react';

import FeedArticle from './FeedArticle';

// Props: {type: string, data: any}
const FeedItem = React.createClass({
  render() {
    const {type} = this.props;
    switch (type) {
      case 'article':
        return <FeedArticle article={this.props.data}/>;
      default:
        return null;
    }
  }
});

export default FeedItem;
