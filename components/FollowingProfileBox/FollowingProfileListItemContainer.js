import React from 'react';
import {connect} from 'react-redux';

import {UserLevel} from '../../utils';

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
    const {userLevel} = this.props;
    const isControllable = userLevel == UserLevel.REGULAR;
    return (
      <FollowingProfileListItem
        hideControllers={!isControllable}
        onClickSetTab={this.props.onClickSetTab}
        onClickStar={this.props.onClickStar}
        profile={this.props.profile}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel
  };
};

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

// fixme 얘네 이름 추천 좀
const mapDispatchToStar2Props = function (dispatch) {
  return {
    onClickStar: id => {
      unstarProfile(dispatch, id);
    },
    onClickSetTab: () => {
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

const NormalFollowingProfileListItemContainer = connect(mapStateToProps, mapDispatchToNormalProps)(FollowingProfileListItemContainer);
const StarFollowingProfileListItemContainer = connect(mapStateToProps, mapDispatchToStarProps)(FollowingProfileListItemContainer);
const Star2FollowingProfileListItemContainer = connect(mapStateToProps, mapDispatchToStar2Props)(FollowingProfileListItemContainer);
const TabFollowingProfileListItemContainer = connect(mapStateToProps, mapDispatchToTabProps)(FollowingProfileListItemContainer);

export {
  NormalFollowingProfileListItemContainer,
  StarFollowingProfileListItemContainer,
  Star2FollowingProfileListItemContainer,
  TabFollowingProfileListItemContainer
};
