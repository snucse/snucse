import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import CommentBox from './Comment.js';
import moment from 'moment';

var Post = React.createClass({
    loadPostFromServer: function() {
        var url = null;
        if('route' in this.props) {
            let {id} = this.props.params;
            url = this.props.route.url+"?group_id="+id;
        } else {
            url = this.props.url;
        };

        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                    this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    Interval: null,

    componentDidMount: function() {
        this.loadPostFromServer();
        this.Interval = setInterval(this.loadPostFromServer, 2000);
    },

    componentWillUnmount: function() {
        clearInterval(this.Interval);
    },

    getInitialState: function() {
        return {data: {articles:[]}};
    },

    render: function() {
        var _this = this;
        var flag = 0;
        var temp = this.state.data.articles;

        var postNodes = this.state.data.articles.map(function(post) {
                var ToGet = "/comment/" +  post.id + ".json";
                var temp = post.content.split("\n");
                var n = temp.length;
                var i = 0;
                var result = []
                for(var i = 0; i < n; i++) {
                    var temp2 = [temp[i], <br/>];
                    result = result.concat(temp2);
                }
                var is_updated = 0;
                var date = post.updated_at;
                if (post.updated_at != post.created_at) {
                    date = date + '(수정됨)'+moment('20110101','YYYYMMDD').fromNow();

                }
                var user_id=1;
                var mine=true;
                if( user_id!=post.writer.id ) {
                    mine=false;
                }
                var url = null;
                if('route' in _this.props) {
                    url = _this.props.route.url;
                } else {
                    url = _this.props.url;
                };

                return (
                    <div className="PostWrap" key={post.id+post.title}>
                    <DelEditBox url={url} mine={mine} post_num={post.id} user_id={user_id} />
                    <h4 className="post_title">Title: {post.title} Group: {post.group.name}</h4>
                    <h3 className="post_author">writer: {post.writer.username}</h3><h3 className="post_date"> date: {date}</h3>
                    <div className="content">
                    {result}
                    </div>
                    </div>
                   );
        });
        return (
                <div className="Post">
                {postNodes}
                </div>
               );
    }
});

var DelEditBox = React.createClass({
    submitpage: function(post_num) {
        browserHistory.push('/'+post_num+'/edit')
    },

    handlePostDelete: function(id) {
        $.ajax({
            url:this.props.url+"/"+this.props.post_num+"?current_user_id="+id,
            dataType:'json',
            type:'DELETE'
        });
    },

    delete_post: function(e) {
        this.handlePostDelete(this.props.user_id)
    },

    render: function() {
        if(this.props.mine) {
            return(
                    <div className="delete_edit_box">
                    <strong onClick={this.delete_post}>삭제</strong>
                    <strong onClick={this.submitpage.bind(this,this.props.post_num)}>수정</strong>
                    </div>
                  );
        } else {
            return( <div/>);
        };
    }   
});


export default Post;
