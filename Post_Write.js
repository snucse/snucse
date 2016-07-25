import React from 'react';
import $ from 'jquery';
import { Navigation, Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Form from 'react-router-form';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

var Post_Write = React.createClass({
    handlePostSubmit: function(comment) {
        $.ajax({
            url: this.props.route.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        });
    },

    render: function() {
        let {id} = this.props.params;
        return (
            <div className="postBox">
            <h3>글쓰기</h3>
            <PostForm onPostSubmit={this.handlePostSubmit} id={id}/>
            </div>
        );
    }
});

var PostForm = React.createClass({
    getInitialState: function() {
        return {title: '', content: ''};
    },
    handleContentChange: function(e) {
        this.setState({content: e.target.value});
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    
    handleSubmit: function(e) {
        var a = confirm("전송하시겠습니까?")
        if (!a) {
            return;
        };
        e.preventDefault();
        var current_user_id = 1;
        var group_id = this.props.id;
        var content = this.state.content.trim();
        var title = this.state.title.trim();
        if (!content || !title) {
            return;
        }
        this.props.onPostSubmit({title: title, current_user_id: current_user_id, content: content, group_id: group_id});
        browserHistory.push('/group/'+group_id);
    },
    
    render: function() {
        return (
                <div className="commentForm">
                    <form name="post" onSubmit={this.handleSubmit}>
                                Title: <input type="text" id="title" className="form-control" name="title" placeholder="title" value={this.state.title} onChange={this.handleTitleChange} /><br/>
                                Content: <textarea rows="4" id="content" className="form-control" name="content" placeholder="Say something..." value={this.state.content} onChange={this.handleContentChange} /><br/>
                                <button type="submit">글쓰기</button>
                    </form>
                </div>
        );
    }
});

export default Post_Write;
