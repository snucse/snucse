import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

var Group_Post = React.createClass({
    render: function() {
        let {id} = this.props.params;
        return (
    <div>
        <div className="menu_of_group">
            <Link to={"/group/"+id+"/write"}>글쓰기</Link>
        </div>
        {this.props.children}
    </div>
        );
    }
});

export default Group_Post;
