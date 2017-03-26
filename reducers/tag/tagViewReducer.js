import {LOAD_TAG_INFORMATION, RESET_TAG_INFORMATION} from '../../actions/actionTypes';
import {updateObject, createReducer} from '../common';

const TAG_VIEW_INITIAL_STATE = {
  loading: false,
  targetTag: null // GET /api/v1/tags/:tag 의 response를 집어넣는다
};

function loadTagInformation(tagViewState, action) {
  return updateObject(tagViewState, {
    loading: false,
    targetTag: action.tagInformation
  });
}

function resetTagInformation(tagViewState) {
  return updateObject(tagViewState, {
    loading: true,
    targetTag: null
  });
}

export default createReducer(TAG_VIEW_INITIAL_STATE, {
  [LOAD_TAG_INFORMATION]: loadTagInformation,
  [RESET_TAG_INFORMATION]: resetTagInformation
});
