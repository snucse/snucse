import React from 'react';

import TagContainer from './TagContainer';

const Tag = React.createClass({
  render() {
    return <TagContainer tagName={this.props.params.tagName}/>;
  }
});

export default Tag;
