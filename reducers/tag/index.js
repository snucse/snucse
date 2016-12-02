import {combineReducers} from 'redux';

import attachedTagReducer from './attachedTagReducer';
import tagViewReducer from './tagViewReducer';
import tagCloudReducer from './tagCloudReducer';
import candidateTagReducer from './candidateTagReducer';

/*
tag reducer structure

* attached
  * profiles
  * articles
* view
  * targetTag
* cloud
  * tags
* candidate
  * tags
*/

export default combineReducers({
  attached: attachedTagReducer,
  view: tagViewReducer,
  cloud: tagCloudReducer,
  candidate: candidateTagReducer
});
