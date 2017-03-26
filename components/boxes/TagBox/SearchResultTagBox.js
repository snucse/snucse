import React from 'react';

import TagBox from './TagBox';

const SearchResultTagBox = React.createClass({
  propTypes: {
    searchResultTags: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <TagBox
        tags={this.props.searchResultTags}
        accessible
        />
    );
  }
});

export default SearchResultTagBox;
