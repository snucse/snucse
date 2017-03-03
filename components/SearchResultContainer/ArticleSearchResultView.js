import React from 'react';

import {ArticleSearchResult} from './SearchResultItems';
import SearchResultLinks from './SearchResultLinks';

const ArticleSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const page = Number(this.props.page) || 0;
    const num = Number(this.props.num) || 10;
    const articleResults = result.articles.data.map(article => {
      return <ArticleSearchResult article={article} key={`${query}-${article.id}`}/>;
    });
    return (
      <section id="search-result-article">
        <h4 id="search-result-article-title">글</h4>
        <ul id="search-result-article-list">
          {articleResults}
        </ul>
        <footer>
          <SearchResultLinks category={'article'} query={query} page={page} num={num} count={result.articles.count}/>
        </footer>
      </section>
    );
  }
});

export default ArticleSearchResultView;
