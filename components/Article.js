import React from 'react';

const Article = React.createClass({

  // load article

  render() {
    return <span>{this.props.id}</span>;
  }
});

// connect state to props

export default Article;
