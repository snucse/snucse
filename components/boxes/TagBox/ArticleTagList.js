import React from 'react';
import {connect} from 'react-redux';

import {UserLevel} from '../../../utils';
import ArticleTagItemContainer from './ArticleTagItemContainer';

const ArticleTagList = React.createClass({
  render() {
    const articleId = this.props.articleId;
    const tags = this.props.tags[articleId] || [];
    const tagItems = tags.map(tag => {
      return <ArticleTagItemContainer articleId={articleId} tag={tag} accessible={this.props.userLevel === UserLevel.REGULAR} key={tag.tag}/>;
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
    userLevel: state.userInfo.userLevel,
    tags: state.tag.attached.articles
  };
};

export default connect(mapStateToProps)(ArticleTagList);
