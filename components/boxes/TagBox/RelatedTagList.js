import React from 'react';

import RelatedTagItemContainer from './RelatedTagItemContainer';

const RelatedTagList = React.createClass({
  render() {
    const tags = this.props.tags || [];
    const tagItems = tags.map(tag => {
      return <RelatedTagItemContainer targetTagName={this.props.targetTagName} tag={tag} key={tag.tag}/>;
    });
    return (
      <ul id="related-tag-list">
        {tagItems}
      </ul>
    );
  }
});

export default RelatedTagList;
