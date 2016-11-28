import React from 'react';
import {Link} from 'react-router';

import {CommentSearchResult} from './SearchResultItems';

const CommentSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const commentResults = result.comments.data.map(comment => {
      return <CommentSearchResult comment={comment} key={`${query}-${comment.id}`}/>;
    });
    return (
      <section>
        <h3>{`'${query}'`} 댓글 검색 결과</h3>
        <form>서치 폼</form>
        <section>
          <h4>댓글</h4>
          {commentResults}
          <footer>
            <span><Link to={`/search?category=comment&query=${query}`}>더보기</Link> (총 개수?)</span>
          </footer>
        </section>
        <p>
          {'0, 1, 2, 3, 4, 5, 6, 7, 8, 9 > 임시'}
        </p>
      </section>
    );
  }
});

export default CommentSearchResultView;
