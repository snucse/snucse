import React from 'react';

import RelatedTagList from './RelatedTagList.js';
import RelatedTagFormContainer from './RelatedTagFormContainer.js';

const RelatedTagBox = React.createClass({
  render() {
    return (
      <div className="tag-wrapper">
        <RelatedTagList targetTagName={this.props.targetTagName} tags={this.props.relatedTags}/>
        <RelatedTagFormContainer targetTagName={this.props.targetTagName}/>
      </div>
    );
  }
});

export default RelatedTagBox;
