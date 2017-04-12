import React from 'react';
import queryString from 'query-string';

import TagContainer from './TagContainer';

const TagInfo = React.createClass({
  render() {
    return <TagContainer tagName={queryString.parse(this.props.location.search).tag}/>;
  }
});

export default TagInfo;
