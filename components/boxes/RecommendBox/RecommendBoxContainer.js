import React from 'react';

import RecommendBox from './RecommendBox';

const RecommendBoxContainer = React.createClass({
  handleRecommend() {
    this.props.recommend(this.props.id);
  },

  render() {
    return <RecommendBox onRecommend={this.handleRecommend} count={this.props.count || 1}/>;
  }
});

export default RecommendBoxContainer;
