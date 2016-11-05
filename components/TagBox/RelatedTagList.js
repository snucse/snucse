import React from 'react';

import RelatedTagItemContainer from './RelatedTagItemContainer.js';

const RelatedTagList = React.createClass({
  render() {
    const tags = this.props.tags || [];
    const tagItems = tags.map(tag => {
      return <RelatedTagItemContainer targetTagName={this.props.targetTagName} tag={tag} key={tag.tag}/>;
    });
    return (
      <ul>
        {tagItems}
      </ul>
    );
  }
});

export default RelatedTagList;
