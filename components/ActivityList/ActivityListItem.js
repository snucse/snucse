import React from 'react';
// import {Link} from 'react-router';

/*
const messages = {
  // type: { name: , action: }
  Profile: { name: '프로필'
};
*/

// type name이(가) action했습니다

const ActivityListItem = React.createClass({

  propTypes: {
    activity: React.PropTypes.object
  },

  render() {
    const {activity} = this.props;
    return (
      <li>
        {activity.id} {JSON.stringify(activity)}
      </li>
    );
  }
});

export default ActivityListItem;
