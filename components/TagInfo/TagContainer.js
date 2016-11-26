import React from 'react';
import {connect} from 'react-redux';

import {loadTagInformation} from '../../actions/dispatchers';
import {UserLevel} from '../../utils';
import TagViewWrapper from './TagViewWrapper';

const TagContainer = React.createClass({
  componentDidMount() {
    if (this.props.userLevel === UserLevel.REGULAR) {
      this.props.loadTagInformation(this.props.tagName);
    }
  },

  componentWillReceiveProps(props) {
    if (props.tagName !== this.props.tagName && this.props.userLevel === UserLevel.REGULAR) {
      this.props.loadTagInformation(props.tagName);
    }
  },

  render() {
    if (this.props.userLevel === UserLevel.REGULAR) {
      return <TagViewWrapper tagName={this.props.tagName} tag={this.props.tag}/>;
    }
    return <p>준회원은 태그 조회가 불가능합니다.</p>;
  }
});

const mapStateToProps = function (state) {
  const {userLevel} = state.userInfo;
  const {targetTag} = state.tag.view;
  return {
    userLevel,
    tag: targetTag
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadTagInformation: tagName => loadTagInformation(dispatch, tagName)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagContainer);
