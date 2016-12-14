import 'whatwg-fetch';

const DataCon = {
  loadDataFromServer(url) {
    return DataCon.postDataToServer(url, 'GET');
  },

  postDataToServer(url, method, data) {
    const token = localStorage.getItem('snucsesession');
    const headers = {
      Authorization: `Token token=${token}`
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
  },

  postFormDataToServer(url, method, data) {
    const token = localStorage.getItem('snucsesession');
    const headers = {
      Authorization: `Token token=${token}`
    };

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
