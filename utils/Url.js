export default {
  getUrl(path, params = {}) {
    let query = '?';
    if (typeof params === 'object') {
      for (const key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
          query += `${key}=${params[key]}`;
        }
      }
    }
    return `/api/v1${path}${query}`;
  }
};
