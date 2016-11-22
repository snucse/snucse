import {LOAD_FEED, LOADING_FEED_STARTED, LOADING_FEED_FINISHED} from '../actions/actionTypes';

const INITIAL_STATE = {
  feeds: [],
  count: 5,
  loading: false
};

export default function feeds(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_FEED: {
      return Object.assign({}, state, {
        feeds: action.feeds
      });
    }
    case LOADING_FEED_FINISHED: {
      return Object.assign({}, state, {
        feedNum: state.feedNum + 1,
        loading: false
      });
    }
    case LOADING_FEED_STARTED: {
      return Object.assign({}, state, {
        loading: true
      });
    }
    default: {
      return state;
    }
  }
}
