import Cookies from 'js-cookie';
import 'whatwg-fetch';

var DataCon = {
  loadDataFromServer: function(url, success) {
    var user_id = localStorage.getItem('snucsesession');
    fetch(url, {
      headers: {
        Authorization: 'Token token=' + user_id
      }
    })
      .then(function(res) {
        return res.json();
      })
      .then(success)
      .catch(function(err) {
        if(err.status == '401' || err.status == '404') {
          location.href = '/login';
        }
      });
  },

  postDataToServer: function(url, data, type) {
    var user_id = localStorage.getItem('snucsesession');
    fetch(url, {
      method: type,
      headers: {
        Authorization: 'Token token=' + user_id,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
};

export default DataCon;
