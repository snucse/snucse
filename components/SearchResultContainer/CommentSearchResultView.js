import React from 'react';

import {CommentSearchResult} from './SearchResultItems';
import SearchResultLinks from './SearchResultLinks';

const CommentSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const page = Number(this.props.page) || 0;
    const num = Number(this.props.num) || 10;
    const commentResults = result.comments.data.map(comment => {
      return <CommentSearchResult comment={comment} key={`${query}-${comment.id}`}/>;
    });
    return (
      <section id="search-result-comment">
        <h4 id="search-result-comment-title">댓글</h4>
        <ul id="search-result-comment-list">
          {commentResults}
        </ul>
        <footer>
          <SearchResultLinks category={'comment'} query={query} page={page} num={num} count={result.comments.count}/>
        </footer>
      </section>
    );
  }
});

export default CommentSearchResultView;
