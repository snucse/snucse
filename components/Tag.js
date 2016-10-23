import React from 'react';

const Tag = React.createClass({
  render() {
    return (
      <div className="tag-view">
        <p>
          {'tag'}
          {this.props.params.tagName}
        </p>
      </div>
    );
  }
});

export default Tag;
