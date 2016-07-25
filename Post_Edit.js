import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import DataCon from './Util.js';

var Edit = React.createClass({
    data: null,

    loadPostFromServer: function() {
        let {post_id} = this.props.params;
        var url = this.props.route.url+'/'+post_id;
        var success = function(data) {
            this.setState({title: data.title, content: data.content});
        }.bind(this);
        DataCon.loadDataFromServer(url, success);
    },

    getInitialState: function() {
        return {title: '', content: ''}
    },

    componentDidMount: function() {
        this.loadPostFromServer();
    },

    EditSubmit: function(data) {
        let {post_id} = this.props.params;
        var url = this.props.route.url+'/'+post_id;
        DataCon.postDataToServer(url, data, 'PUT');
    },

    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    
    handleContentChange: function(e) {
        this.setState({content: e.target.value});
    },
    
    handleEdit: function(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var content = this.state.content.trim();
        var user_id = 1;
        this.EditSubmit({title: title, content: content, current_user_id: user_id});
        this.setState({title: '', content: ''});
        browserHistory.push('/');
    },

    render: function() {
        return (
            <div>
            <form onSubmit={this.handleEdit}>
            <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTitleChange} />
            <textarea rows="5" id="content" name="content" value={this.state.content} onChange={this.handleContentChange} />
            <input type="submit" value="수정"/>
            </form>
            </div>

               );
    }
});

export default Edit;
