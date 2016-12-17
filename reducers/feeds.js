import {LOAD_FEED, LOAD_FEED_RESET, UPDATE_SINGLE_FEED} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const FEEDS_INITIAL_STATE = {
  byId: {},
  allIds: [],
  loadMore: [],
  resetLoading: false
};

function loadFeedReset() {
  return {
    byId: {},
    allIds: [],
    loadMore: [],
    resetLoading: true
  };
}

function loadFeed(state, action) {
  const byId = action.feeds.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
  // 내림차순 정렬
  const newIds = action.feeds.map(item => item.id).sort((a, b) => b - a);
  if (action.reset) {
    const loadMore = [];
    if (action.moreDataPresent) {
      if (newIds.length <= 0) {
        console.warn('feeds.length <= 0 while moreDataPresent, impossible');
      } else {
        const val = newIds[newIds.length - 1];
        loadMore.push({
          automatic: true,
          maxId: val - 1,
          limit: 5
        });
      }
    }
    return updateObject(state, {
      byId,
      allIds: newIds,
      loadMore,
      resetLoading: false
    });
  }
  const ids = new Set(state.allIds);
  const loadMore = state.loadMore.filter(item => {
    return !(item.sinceId === action.sinceId && item.maxId === action.maxId);
  });
  if (action.moreDataPresent) { // 덜 로드됨
    if (newIds.length <= 0) {
      console.warn('feeds.length <= 0 while moreDataPresent, impossible');
    } else {
      const val = newIds[newIds.length - 1];
      loadMore.push({
        automatic: Boolean(action.automatic),
        maxId: val - 1,
        sinceId: action.sinceId,
        limit: 5
      });
    }
  }
  for (const id of newIds) {
    ids.add(id);
  }
  return updateObject(state, {
    byId: {...state.byId, ...byId},
    allIds: Array.from(ids).sort((a, b) => b - a),
    loadMore: loadMore.sort((a, b) => b.maxId - a.maxId)
  });
}

function updateSingleFeed(state, action) {
  const {feed} = action;
  const {id} = feed;
  if (id in state.byId) {
    // already exists; update
    return updateObject(state, {
      byId: {...state.byId, [id]: feed}
    });
  }
  // does not exist; do nothing
  return state;
}

export default createReducer(FEEDS_INITIAL_STATE, {
  [LOAD_FEED]: loadFeed,
  [LOAD_FEED_RESET]: loadFeedReset,
  [UPDATE_SINGLE_FEED]: updateSingleFeed
});
