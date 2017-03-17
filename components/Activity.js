import React from 'react';
import queryString from 'query-string';
import ActivityList from './ActivityList';

const Activity = React.createClass({

  render() {
    const query = queryString.parse(this.props.location.search);
    return (
      <div>
        <ActivityList query={query}/>
      </div>
    );
    // query {profileId, filterType, filterAction, page, limit}
  }
});

export default Activity;
