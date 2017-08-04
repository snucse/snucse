import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadSearchResult(dispatch, query, category = '', page, num) {
  const empty = {data: []};

  if (query === undefined) {
    dispatch({
      type: types.LOAD_SEARCH_RESULT,
      articles: empty,
      comments: empty,
      profiles: empty,
      tags: empty
    });
    return;
  }
  DataCon.loadDataFromServer(Url.getUrl(`/search/${category}`, {q: query, page, limit: num})).then(result => {
    dispatch({
      type: types.LOAD_SEARCH_RESULT,
      articles: result.articles || empty,
      comments: result.comments || empty,
      profiles: result.profiles || empty,
      tags: result.tags || empty
    });
  });
}
