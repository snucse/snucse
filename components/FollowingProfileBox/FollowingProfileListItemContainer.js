import React from 'react';
import {connect} from 'react-redux';

import {
  starProfile,
  unstarProfile,
  setProfileAsTab,
  unsetProfileAsTab
} from '../../actions/dispatchers';
import FollowingProfileListItem from './FollowingProfileListItem';

const FollowingProfileListItemContainer = React.createClass({

  propTypes: {
    onClickSetTab: React.PropTypes.func,
    onClickStar: React.PropTypes.func,
    profile: React.PropTypes.object
  },

  render() {
    return (
      <FollowingProfileListItem
        onClickSetTab={this.props.onClickSetTab}
        onClickStar={this.props.onClickStar}
        profile={this.props.profile}
        />
    );
  }
});

const mapDispatchToNormalProps = function (dispatch) {
  return {
    onClickStar: id => {
      starProfile(dispatch, id);
    },
    onClickSetTab: () => {
    }
  };
};

const mapDispatchToStarProps = function (dispatch) {
  return {
    onClickStar: id => {
      unstarProfile(dispatch, id);
    },
    onClickSetTab: id => {
      setProfileAsTab(dispatch, id);
    }
  };
};

const mapDispatchToTabProps = function (dispatch) {
  return {
    onClickStar: () => {
    },
    onClickSetTab: id => {
      unsetProfileAsTab(dispatch, id);
    }
  };
};

const NormalFollowingProfileListItemContainer = connect(null, mapDispatchToNormalProps)(FollowingProfileListItemContainer);
const StarFollowingProfileListItemContainer = connect(null, mapDispatchToStarProps)(FollowingProfileListItemContainer);
const TabFollowingProfileListItemContainer = connect(null, mapDispatchToTabProps)(FollowingProfileListItemContainer);

export {
  NormalFollowingProfileListItemContainer,
  StarFollowingProfileListItemContainer,
  TabFollowingProfileListItemContainer
};
