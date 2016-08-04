import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import DataCon from './Util.js';

var Group = React.createClass({
  loadGroupsfromServer: function() {
    var url = this.props.route.url;
    var success = function(data) {
      this.setState({data: data});
    }.bind(this);
    DataCon.loadDataFromServer(url, success);
  },

  componentDidMount: function() {
    this.loadGroupsfromServer();
  },

  getInitialState: function() {
    return {data: {groups:[]}}
  },

  Groups: function(id) {
    browserHistory.push('/group/'+id);
  },

  render: function() {
    var _this = this;
    var groups = this.state.data.groups.map(function(group) { 
      return(
        <div key={group.id + group.name} className="groups">
          <strong onClick={_this.Groups.bind(_this, group.id)}>{group.name}</strong>
        </div>
      );
    });

    return (
      <div>
        {groups}
      </div>
     );
  }
});

export default Group;
