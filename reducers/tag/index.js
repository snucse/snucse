import {combineReducers} from 'redux';

import attachedTagReducer from './attachedTagReducer.js';
import tagViewReducer from './tagViewReducer.js';
import tagCloudReducer from './tagCloudReducer.js';

/*
tag reducer structure

* attached
  * profiles
  * articles
* view
  * targetTag
* cloud
  * tags
*/

export default combineReducers({
  attached: attachedTagReducer,
  view: tagViewReducer,
  cloud: tagCloudReducer
});
