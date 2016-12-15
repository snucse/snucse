import React from 'react';

import RelatedTagList from './RelatedTagList';
import RelatedTagFormContainer from './RelatedTagFormContainer';

const RelatedTagBox = React.createClass({
  render() {
    return (
      <div id="related-tag-container">
        <RelatedTagList targetTagName={this.props.targetTagName} tags={this.props.relatedTags}/>
        <RelatedTagFormContainer targetTagName={this.props.targetTagName}/>
      </div>
    );
  }
});

export default RelatedTagBox;
