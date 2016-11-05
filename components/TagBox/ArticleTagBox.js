import React from 'react';

import ArticleTagList from './ArticleTagList.js';
import ArticleTagFormContainer from './ArticleTagFormContainer.js';

const ArticleTagBox = React.createClass({
  render() {
    return (
      <div className="tag-wrapper">
        <ArticleTagList articleId={this.props.articleId}/>
        <ArticleTagFormContainer articleId={this.props.articleId}/>
      </div>
    );
  }
});

export default ArticleTagBox;
