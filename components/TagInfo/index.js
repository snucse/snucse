import React from 'react';

import TagContainer from './TagContainer';

const TagInfo = React.createClass({
  render() {
    return <TagContainer tagName={this.props.location.query.tag}/>;
  }
});

export default TagInfo;
