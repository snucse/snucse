import React from 'react';
import {connect} from 'react-redux';

import {loadTagCloud} from '../../actions/dispatchers';
import TagCloud from './TagCloud.js';

const TagCloudContainer = React.createClass({
  componentDidMount() {
    this.props.loadTagCloud();
  },

  render() {
    return <TagCloud tags={this.props.tags}/>;
  }
});

const mapStateToProps = function (state) {
  const {tags} = state.tag.cloud;
  return {
    tags
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadTagCloud: () => loadTagCloud(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagCloudContainer);
