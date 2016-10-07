import React from 'react';
import Post from './Post.js';

const Main = React.createClass({
  render() {
    return (
      <div className="posts">
        <Post url={this.props.route.url}/>
      </div>
    );
  }
});

export default Main;
