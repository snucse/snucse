import $ from 'jquery';
import Cookies from 'js-cookie';

var DataCon = {
  loadDataFromServer: function(url, success) {
//    var user_id = document.cookie.split('=');
    var user_id = Cookies.get('snucsesession');
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: success,
      error: function(xhr) {
        if(xhr.status=='401' || '404') {
          location.href="/login";
        }
      },
      headers: {
        Authorization: 'Token token=' + user_id
      }
    });
  },

  postDataToServer: function(url, data, type) {
//    var user_id = document.cookie.split('=');
    var user_id = Cookies.get('snucsesession');
    $.ajax({
      url: url,
      dataType: 'json',
      data: data,
      type: type,
      headers: {
        Authorization: 'Token token=' + user_id
      }
    });
  }
};

export default DataCon;
