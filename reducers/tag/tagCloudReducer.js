import {LOAD_TAGCLOUD} from '../../actions/actionTypes';
import {updateObject, createReducer} from '../common';

const TAGCLOUD_INITIAL_STATE = {
  tags: []
};

function loadTagCloud(tagCloudState, action) {
  return updateObject(tagCloudState, {tags: action.tags});
}

const tagCloudReducer = createReducer(TAGCLOUD_INITIAL_STATE, {
  [LOAD_TAGCLOUD]: loadTagCloud
});

export default tagCloudReducer;
