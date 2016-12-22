import React from 'react';
import {Link} from 'react-router';

const TagItem = React.createClass({
  handleClickDelete() {
    this.props.onDelete(this.props.tag.tag);
  },

  render() {
    return this.props.accessible ? (
      <li className="tag-item">
        <Link className="tag-item-name" to={{pathname: '/tags', query: {tag: this.props.tag.tag}}}>{this.props.tag.tag}</Link>
        <button className="tag-item-delete-button" onClick={this.handleClickDelete}>×</button>
      </li>
    ) : (
      <li className="tag-item">
        {this.props.tag.tag}
      </li>
    );
  }
});

export default TagItem;
