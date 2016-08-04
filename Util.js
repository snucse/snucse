import $ from 'jquery';

var DataCon = {
  loadDataFromServer: function(url, success) {
    var user_id = document.cookie.split('=');
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
        Authorization: 'Token token=' + user_id[1]
      }
    });
  },

  postDataToServer: function(url, data, type) {
    var user_id = document.cookie.split('=');
    $.ajax({
      url: url,
      dataType: 'json',
      data: data,
      type: type,
      headers: {
        Authorization: 'Token token=' + user_id[1]
      }
    });
  }
};

export default DataCon;
