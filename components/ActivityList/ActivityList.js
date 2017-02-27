import React from 'react';

import ActivityListItem from './ActivityListItem';

const ActivityList = React.createClass({

  propTypes: {
    loadActivity: React.PropTypes.func,
    activities: React.PropTypes.array,
    loading: React.PropTypes.bool,
    isError: React.PropTypes.bool,
    query: React.PropTypes.object
  },

  componentDidMount() {
    this.props.loadActivity(this.props.query);
  },

  componentWillReceiveProps(props) {
    // fixme object 째 비교 좀
    if (this.props.query.profileId !== props.query.profileId ||
        this.props.query.filterType !== props.query.filterType ||
        this.props.query.filterAction !== props.query.filterAction ||
        this.props.query.page !== props.query.page ||
        this.props.query.limit !== props.query.limit) {
      this.props.loadActivity(props.query);
    }
  },

  render() {
    const listItemViews = this.props.activities.map(activity => {
      return (
        <ActivityListItem
          activity={activity}
          key={`activity-${activity.id}`}
          />
      );
      // to activity list item view
    });
    const view = this.props.isError ? (
      <span>에러</span>
    ) : this.props.loading ? (
      <span>로딩 중</span>
    ) : (
      <ul>
        {listItemViews}
      </ul>
    );
    return (
      <main>
        {view}
      </main>
    );
  }
});

export default ActivityList;
