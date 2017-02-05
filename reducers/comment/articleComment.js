import {
  LOAD_COMMENTS,
  SET_LAST_COMMENT,
  MODIFY_FOLD_COMMENT,
  WRITE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../../actions/actionTypes';
import generateCommentReducers from './commentReducer';

export default generateCommentReducers({
  load: LOAD_COMMENTS,
  setLast: SET_LAST_COMMENT,
  modifyFold: MODIFY_FOLD_COMMENT,
  write: WRITE_COMMENT,
  edit: EDIT_COMMENT,
  delete: DELETE_COMMENT
}, 'articleId');
