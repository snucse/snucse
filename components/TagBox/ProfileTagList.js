import React from 'react';
import {connect} from 'react-redux';

import ProfileTagItemContainer from './ProfileTagItemContainer.js';

const ProfileTagList = React.createClass({
  render() {
    const profileId = this.props.profileId;
    const tags = this.props.tags[profileId] || [];
    const tagItems = tags.map(tag => {
      return <ProfileTagItemContainer profileId={profileId} tag={tag} key={tag.tag}/>;
    });
    return (
      <ul>
        {tagItems}
      </ul>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    tags: state.tag.tags.profiles
  };
};

export default connect(mapStateToProps)(ProfileTagList);
