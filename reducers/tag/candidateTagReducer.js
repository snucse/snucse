import {INITIALIZE_CANDIDATE_TAGS, LOAD_CANDIDATE_TAGS} from '../../actions/actionTypes';
import {updateObject, createReducer} from '../common';

const CANDIDATE_TAGS_INITIAL_STATE = {
  byTagFormId: {}
};

function initializeCandidateTags(candidateTagsState, action) {
  return updateObject(candidateTagsState, {
    byTagFormId: {
      ...candidateTagsState.byTagFormId,
      [action.tagFormId]: []
    }
  });
}

function loadCandidateTags(candidateTagsState, action) {
  return updateObject(candidateTagsState, {
    byTagFormId: {
      ...candidateTagsState.byTagFormId,
      [action.tagFormId]: action.tags
    }
  });
}

export default createReducer(CANDIDATE_TAGS_INITIAL_STATE, {
  [INITIALIZE_CANDIDATE_TAGS]: initializeCandidateTags,
  [LOAD_CANDIDATE_TAGS]: loadCandidateTags
});
