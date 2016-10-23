import React from 'react';
import {connect} from 'react-redux';

import ArticleTagItemContainer from './ArticleTagItemContainer.js';

const ArticleTagList = React.createClass({
  render() {
    const articleId = this.props.articleId;
    const tags = this.props.tags[articleId] || [];
    const tagItems = tags.map(tag => {
      return <ArticleTagItemContainer articleId={articleId} tag={tag} key={tag.tag}/>;
    });
    return (
      <ul>
        {tagItems}
      </ul>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    tags: state.tag.tags.articles
  };
};

export default connect(mapStateToProps)(ArticleTagList);
