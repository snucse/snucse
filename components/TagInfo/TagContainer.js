import React from 'react';
import {connect} from 'react-redux';

import {loadTagInformation} from '../../actions/dispatchers';
import TagViewWrapper from './TagViewWrapper';

const TagContainer = React.createClass({
  componentDidMount() {
    this.props.loadTagInformation(this.props.tagName);
  },

  componentWillReceiveProps(props) {
    if (props.tagName !== this.props.tagName) {
      this.props.loadTagInformation(props.tagName);
    }
  },

  render() {
    return <TagViewWrapper tagName={this.props.tagName} tag={this.props.tag}/>;
  }
});

const mapStateToProps = function (state) {
  const {targetTag} = state.tag.view;
  return {
    tag: targetTag
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadTagInformation: tagName => loadTagInformation(dispatch, tagName)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagContainer);
