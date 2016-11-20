import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadSearchResult(dispatch, query, category = '', page = 0, num = 5) {
  DataCon.loadDataFromServer(Url.getUrl(`search/${category}?q=${query}&page=${page}&limit=${num}`)).then(result => {
    console.log(result);
    dispatch({
      type: types.LOAD_SEARCH_RESULT,
      articles: result.articles || [],
      comments: result.comments || [],
      profiles: result.profiles || [],
      tags: result.tags || []
    });
  });
}
