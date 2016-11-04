import {LOAD_TAGCLOUD} from '../../actions/actionTypes';
import {updateObject} from '../common';

const TAGCLOUD_INITIAL_STATE = {
  tags: []
};

function loadTagCloud(tagCloudState, action) {
  return updateObject(tagCloudState, {tags: action.tags});
}

export default function tagCloudReducer(tagCloudState = TAGCLOUD_INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_TAGCLOUD: return loadTagCloud(tagCloudState, action);
    default: return tagCloudState;
  }
}
