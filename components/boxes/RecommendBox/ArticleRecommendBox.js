import React from 'react';
// import {connect} from 'react-redux';

// import dispatcher
import RecommendBox from './RecommendBox';

const ArticleRecommendBox = React.createClass({
  handleRecommend() {
  },

  render() {
    return <RecommendBox onRecommend={this.handleRecommend} count={1}/>;
  }
});

// map dispatch, prop

export default ArticleRecommendBox;
