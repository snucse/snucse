import React from 'react';
import {connect} from 'react-redux';

import ProfileTagItemContainer from './ProfileTagItemContainer';

const ProfileTagList = React.createClass({
  render() {
    const profileId = this.props.profileId;
    const tags = this.props.tags[profileId] || [];
    const tagItems = tags.map(tag => {
      return <ProfileTagItemContainer profileId={profileId} tag={tag} key={tag.tag}/>;
    });
    return (
      <ul className="tag-list">
        {tagItems}
      </ul>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    tags: state.tag.attached.profiles
  };
};

export default connect(mapStateToProps)(ProfileTagList);
