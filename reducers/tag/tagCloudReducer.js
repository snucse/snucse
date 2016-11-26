import {LOAD_TAGCLOUD} from '../../actions/actionTypes';
import {updateObject, createReducer} from '../common';

const TAGCLOUD_INITIAL_STATE = {
  tags: []
};

function loadTagCloud(tagCloudState, action) {
  return updateObject(tagCloudState, {tags: action.tags});
}

export default createReducer(TAGCLOUD_INITIAL_STATE, {
  [LOAD_TAGCLOUD]: loadTagCloud
});
