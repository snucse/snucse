import React from 'react';

import ActivityList from './ActivityList';

const Activity = React.createClass({

  render() {
    const {query} = this.props.location;
    return (
      <div>
        <h2>활동</h2>
        <ActivityList query={query}/>
      </div>
    );
    // query {profileId, filterType, filterAction, page, limit}
  }
});

export default Activity;
