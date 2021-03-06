import React from 'react';
import {connect} from 'react-redux';

import '../../stylesheets/activity.styl';

import {loadActivity, searchProfile} from '../../actions/dispatchers';
import ActivityFilter from './ActivityFilter';
import ActivityList from './ActivityList';
import ActivityPageNavigation from './ActivityPageNavigation';

const ActivityContainer = React.createClass({

  propTypes: {
    query: React.PropTypes.object
  },

  render() {
    const {query} = this.props;
    return (
      <div id="activity-wrapper">
        <ActivityFilter
          candidateProfiles={this.props.candidateProfiles}
          searchProfile={this.props.searchProfile}
          query={query}
          />
        <div id="activity-sub-wrapper">
          <ActivityList
            loadActivity={this.props.loadActivity}
            activities={this.props.activities}
            loading={this.props.loading}
            isError={this.props.isError}
            query={query}
            />
          <ActivityPageNavigation
            count={this.props.count}
            query={query}
            />
        </div>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    candidateProfiles: state.activity.autoComplete.profiles,
    count: state.activity.count,
    activities: state.activity.activities,
    loading: state.activity.loading,
    isError: state.activity.isError
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadActivity: options => loadActivity(dispatch, options),
    searchProfile: (prefix, limit) => searchProfile(dispatch, prefix, limit)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);
