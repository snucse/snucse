import React from 'react';
import Article from './Article.js';

const Main = React.createClass({
  render() {
    return (
      <div className="articles">
        <Article/>
      </div>
    );
  }
});

export default Main;
