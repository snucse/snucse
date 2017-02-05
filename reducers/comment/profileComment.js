import {
  LOAD_PROFILE_COMMENT,
  SET_LAST_PROFILE_COMMENT,
  MODIFY_FOLD_PROFILE_COMMENT,
  WRITE_PROFILE_COMMENT,
  EDIT_PROFILE_COMMENT,
  DELETE_PROFILE_COMMENT
} from '../../actions/actionTypes';
import generateCommentReducers from './commentReducer';

export default generateCommentReducers({
  load: LOAD_PROFILE_COMMENT,
  setLast: SET_LAST_PROFILE_COMMENT,
  modifyFold: MODIFY_FOLD_PROFILE_COMMENT,
  write: WRITE_PROFILE_COMMENT,
  edit: EDIT_PROFILE_COMMENT,
  delete: DELETE_PROFILE_COMMENT
}, 'profileId');
