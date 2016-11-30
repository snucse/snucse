export default {
  getUrl(path, params = {}) {
    const query = [];
    if (typeof params === 'object') {
      for (const key of Object.keys(params)) {
        if (params[key] !== undefined) {
          query.push(`${key}=${params[key]}`);
        }
      }
    }
    const queryString = query.length === 0 ? '' : `?${query.join('&')}`;
    return `/api/v1${path}${queryString}`;
  }
};
