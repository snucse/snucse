import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

var MyGroup = React.createClass({
    loadGroupfromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: {groups:[]}}
    },

    componentDidMount: function() {
        this.loadGroupfromServer();
    },

    render: function() {
        var _this = this;
        var groups = this.state.data.groups.map(function(group) {
            return (
                    <li key={group.id+group.name}><Link to={"/group/"+group.id}>{group.name}</Link></li>
            );
        });

        return (
    <ul>
        {groups}
    </ul>
        );
    }
});

export default MyGroup;
