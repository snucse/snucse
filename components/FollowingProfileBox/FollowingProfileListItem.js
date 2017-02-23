import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

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

export default FollowingProfileListItem;
