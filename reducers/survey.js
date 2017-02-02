import {LOAD_SURVEY, OPEN_SURVEY} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const SURVEY_INITIAL_STATE = {
  opened: false
};

function loadSurvey(state, action) {
  return updateObject(state, {survey: action.survey});
}

function openSurvey(state) {
  return updateObject(state, {opened: true});
}

export default createReducer(SURVEY_INITIAL_STATE, {
  [LOAD_SURVEY]: loadSurvey,
  [OPEN_SURVEY]: openSurvey
});
