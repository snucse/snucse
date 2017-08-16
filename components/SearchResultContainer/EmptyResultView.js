import React from 'react';

const EmptyResultView = React.createClass({
  render() {
    return (
      <p className="search-result-empty">
        검색 결과가 없습니다.
      </p>
    );
  }
});

export default EmptyResultView;
