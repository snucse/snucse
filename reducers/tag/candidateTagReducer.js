import {INITIALIZE_CANDIDATE_TAGS, LOAD_CANDIDATE_TAGS} from '../../actions/actionTypes';
import {updateObject, createReducer} from '../common';

const CANDIDATE_TAGS_INITIAL_STATE = {
  tags: []
};

function initializeCandidateTags(candidateTagsState) {
  return updateObject(candidateTagsState, {tags: []});
}

function loadCandidateTags(candidateTagsState, action) {
  return updateObject(candidateTagsState, {tags: action.tags});
}

export default createReducer(CANDIDATE_TAGS_INITIAL_STATE, {
  [INITIALIZE_CANDIDATE_TAGS]: initializeCandidateTags,
  [LOAD_CANDIDATE_TAGS]: loadCandidateTags
});
