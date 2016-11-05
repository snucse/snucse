import React from 'react';

import TagContainer from './TagContainer';

const TagInfo = React.createClass({
  render() {
    return <TagContainer tagName={this.props.params.tagName}/>;
  }
});

export default TagInfo;
