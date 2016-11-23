import {LOAD_FEED, LOADING_FEED_STARTED, LOADING_FEED_FINISHED} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const FEEDS_INITIAL_STATE = {
  feeds: [],
  count: 5,
  loading: false
};

function loadFeed(state, action) {
  return updateObject(state, {
    feeds: action.feeds
  });
}

function loadingFeedFinished(state) {
  return updateObject(state, {
    feedNum: state.feedNum + 1,
    loading: false
  });
}

function loadingFeedStarted(state) {
  return updateObject(state, {
    loading: true
  });
}

export default createReducer(FEEDS_INITIAL_STATE, {
  [LOAD_FEED]: loadFeed,
  [LOADING_FEED_STARTED]: loadingFeedStarted,
  [LOADING_FEED_FINISHED]: loadingFeedFinished
});
