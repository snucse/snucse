import React from 'react';
import ArticleList from './ArticleList';

const Main = React.createClass({
  render() {
    return (
      <div className="articles">
        <ArticleList/>
      </div>
    );
  }
});

export default Main;
