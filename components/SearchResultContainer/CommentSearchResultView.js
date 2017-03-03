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
      <section>
        <h4>댓글</h4>
        {commentResults}
        <footer>
          <SearchResultLinks category={'comment'} query={query} page={page} num={num} count={result.comments.count}/>
        </footer>
      </section>
    );
  }
});

export default CommentSearchResultView;
