import userId from './userId';
import postList from './postList';
import comment from './comment';
import me from './me';
// import * as types from '../actions/actionTypes';
// import other reducers

// define other reducers

const reducers = {
  postList,
  comment,
  userId,
  me
  // list up all reducers
};

// this file exports a mere object, which is to be combined at app.js later
export default reducers;
