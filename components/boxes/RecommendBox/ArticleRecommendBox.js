import React from 'react';
import {connect} from 'react-redux';

import {recommendArticle} from '../../../actions/dispatchers';
import RecommendBoxContainer from './RecommendBoxContainer';

const ArticleRecommendBox = React.createClass({
  render() {
    return (
      <RecommendBoxContainer
        id={this.props.articleId}
        recommend={this.props.recommendArticle}
        count={this.props.count}
        />
    );
  }
});

// map dispatch, prop
const mapDispatchToProps = function (dispatch) {
  return {
    recommendArticle: id => recommendArticle(dispatch, id)
  };
};

export default connect(null, mapDispatchToProps)(ArticleRecommendBox);
