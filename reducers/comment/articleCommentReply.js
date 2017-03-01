import {
  LOAD_COMMENT_REPLY,
  SET_LAST_COMMENT_REPLY,
  MODIFY_FOLD_COMMENT_REPLY,
  WRITE_COMMENT_REPLY,
  EDIT_COMMENT_REPLY,
  DELETE_COMMENT_REPLY
} from '../../actions/actionTypes';
import generateCommentReducers from './commentReducer';

export default generateCommentReducers({
  load: LOAD_COMMENT_REPLY,
  setLast: SET_LAST_COMMENT_REPLY,
  modifyFold: MODIFY_FOLD_COMMENT_REPLY,
  write: WRITE_COMMENT_REPLY,
  edit: EDIT_COMMENT_REPLY,
  delete: DELETE_COMMENT_REPLY
}, 'parentCommentId');
