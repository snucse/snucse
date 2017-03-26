import React from 'react';
import {connect} from 'react-redux';

import TagBox from './TagBox';

const SearchResultTagBox = React.createClass({
  propTypes: {
    searchResultTags: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <TagBox
        userLevel={this.props.userLevel}
        tags={this.props.searchResultTags}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel
  };
};

export default connect(mapStateToProps)(SearchResultTagBox);
