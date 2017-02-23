import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {
  starProfile,
  unstarProfile,
  setProfileAsTab,
  unsetProfileAsTab
} from '../../actions/dispatchers';

const FollowingProfileListItem = React.createClass({

  propTypes: {
    onClickSetTab: React.PropTypes.func,
    onClickStar: React.PropTypes.func,
    profile: React.PropTypes.object
  },

  handleClickStar() {
    this.props.onClickStar(this.props.profile.id);
  },

  handleClickSetTab() {
    this.props.onClickSetTab(this.props.profile.id);
  },

  render() {
    const {profile} = this.props;
    const starClass = classnames({
      star: profile.star
    });
    const starView = (
      <span onClick={this.handleClickStar} className={starClass}>
        {profile.star ? '★' : '☆'}
      </span>
    );
    const tabClass = classnames({
      tabbed: profile.tab !== undefined
    });
    const setTabView = profile.star ? (
      <span onClick={this.handleClickSetTab} className={tabClass}>
        {profile.tab === undefined ? '○' : '◎'}
      </span>
    ) : null;
    return (
      <li className="following-profiles-list-item">
        {starView}
        {setTabView}
        <Link to={`/${profile.id}`}>{profile.name}</Link>
      </li>
    );
  }
});

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
// container
// profile 받음
// star 판단
  // 눌렀을 때 다른 일 하도록 부여
// tag 판단
  // 눌렀을 때 다른 일 하도록 부여
// item에게 줌

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

const FollowingProfileBox = React.createClass({

  propTypes: {
    showAllProfileLink: React.PropTypes.bool
  },

  render() {
    const profiles = this.props.me.following.map(profile => {
      const itemView = profile.tab === undefined ? profile.star ? (
        <StarFollowingProfileListItemContainer key={`${profile.id}${profile.name}`} profile={profile}/>
      ) : (
        <NormalFollowingProfileListItemContainer key={`${profile.id}${profile.name}`} profile={profile}/>
      ) : (
        <TabFollowingProfileListItemContainer key={`${profile.id}${profile.name}`} profile={profile}/>
      );
      return itemView;
    });
    const allProfileLink = this.props.showAllProfileLink ?
      <Link id="all-profiles-link" to="/profiles">전체 프로필 보기</Link> :
      null;

    return (
      <section id="following-profiles-box">
        <h5 id="following-profiles-title">팔로우 중인 프로필{allProfileLink}</h5>
        <ul id="following-profiles-list">
          {profiles}
        </ul>
      </section>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    me: state.me
  };
};

export default connect(mapStateToProps)(FollowingProfileBox);
