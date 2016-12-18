import 'whatwg-fetch';

function fetchHelper(url, options) {
  const token = localStorage.getItem('snucsesession');
  options.headers.Authorization = `Token token=${token}`;

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

const DataCon = {
  loadDataFromServer(url) {
    return DataCon.postDataToServer(url, 'GET');
  },

  postDataToServer(url, method, data) {
    const headers = {};
    if (data != null) {
      headers['Content-Type'] = 'application/json';
    }
    const options = {
      method: method || 'GET',
      headers
    };
    if (data != null) {
      options.body = JSON.stringify(data);
    }

    return fetchHelper(url, options);
  },

  postFormDataToServer(url, method, data) {
    const headers = {};
    const formData = new FormData();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (Array.isArray(data[key])) {
          for (let i = 0; i < data[key].length; i++) {
            formData.append(`${key}[]`, data[key][i]);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    const options = {
      method,
      headers,
      body: formData
    };

    return fetchHelper(url, options);
  }
};

export default DataCon;
