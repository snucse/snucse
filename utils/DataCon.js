import 'whatwg-fetch';

const DataCon = {
  loadDataFromServer(url) {
    return DataCon.postDataToServer(url, 'GET');
  },

  postDataToServer(url, method, data) {
    const userId = localStorage.getItem('snucsesession');
    const headers = {
      Authorization: `Token token=${userId}`
    };
    if (data != null) {
      headers['Content-Type'] = 'application/json';
    }
    const options = {
      method,
      headers,
      body: data == null ? undefined : JSON.stringify(data)
    };
    return fetch(url, options).then(res => {
      if (!res.ok) {
        throw res;
      }
      if (res.status === 204) {
        return res.text();
      }
      return res.json();
    }).catch(err => {
      if (err.status === 401) {
        location.href = '/login';
      }
      throw err;
    });
  }
};

export default DataCon;
