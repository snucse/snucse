import React from 'react';

import ArticleTagList from './ArticleTagList';
import ArticleTagFormContainer from './ArticleTagFormContainer';

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
