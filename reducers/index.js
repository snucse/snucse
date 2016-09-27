import Immutable from 'immutable'
import * as types from '../actions/actionTypes'

import postList from './postList'
import profileList from './profileList'
// import other reducers

// define other reducers

const reducers = {
  postList,
  profileList,
  // list up all reducers
}

// this file exports a mere object, which is to be combined at app.js later
export default reducers
