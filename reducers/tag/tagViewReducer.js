import {LOAD_TAG_INFORMATION} from '../../actions/actionTypes';
import {updateObject} from '../common';

const TAG_VIEW_INITIAL_STATE = {
  targetTag: null // GET /api/v1/tags/:tag 의 response를 집어넣는다
};

function loadTagInformation(tagViewState, action) {
  return updateObject(tagViewState, {targetTag: action.tagInformation});
}

export default function tagViewReducer(tagViewState = TAG_VIEW_INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_TAG_INFORMATION: return loadTagInformation(tagViewState, action);
    default: return tagViewState;
  }
}
