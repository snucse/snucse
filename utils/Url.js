export default {
  getUrl(path, params = {}) {
    let query = '?';
    if (typeof params === 'object') {
      for (const key of Object.keys(params)) {
        if (params[key] !== undefined) {
          query += `${key}=${params[key]}`;
        }
      }
    }
    return `/api/v1${path}${query}`;
  }
};
