import $ from 'jquery';

var DataCon = {
    loadDataFromServer: function(url, success) {
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: success,
            headers: {
                'Authorization': 'Token token='+document.cookie['snucsesession']
            }
        });
    },

    postDataToServer: function(url, data, type) {
        $.ajax({
            url: url,
            dataType: 'json',
            data: data,
            type: type,
            headers: {
                'Authorization': 'Token token='+document.cookie['snucsesession']
            }
        });
    }
};

export default DataCon;
