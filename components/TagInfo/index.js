import React from 'react';

import TagContainer from './TagContainer';

const TagInfo = React.createClass({
  render() {
    if (!(this.props.location.query && this.props.location.query.tag)) {
      return <p>정상적이지 않은 접근입니다.</p>;
    }

    return <TagContainer tagName={this.props.location.query.tag}/>;
  }
});

export default TagInfo;
