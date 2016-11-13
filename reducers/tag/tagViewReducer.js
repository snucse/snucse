import {LOAD_TAG_INFORMATION} from '../../actions/actionTypes';
import {updateObject, createReducer} from '../common';

const TAG_VIEW_INITIAL_STATE = {
  targetTag: null // GET /api/v1/tags/:tag 의 response를 집어넣는다
};

function loadTagInformation(tagViewState, action) {
  return updateObject(tagViewState, {targetTag: action.tagInformation});
}

const tagViewReducer = createReducer(TAG_VIEW_INITIAL_STATE, {
  [LOAD_TAG_INFORMATION]: loadTagInformation
});

export default tagViewReducer;
