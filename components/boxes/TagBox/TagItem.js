import React from 'react';
import {Link} from 'react-router';

const TagItem = React.createClass({

  propTypes: {
    accessible: React.PropTypes.bool,
    deletable: React.PropTypes.bool
  },

  handleClickDelete() {
    this.props.onDelete(this.props.tag.tag);
  },

  render() {
    const tagName = this.props.accessible ? (
      <Link className="tag-item-name" to={{pathname: '/tags', query: {tag: this.props.tag.tag}}}>{this.props.tag.tag}</Link>
    ) : (
      <span>{this.props.tag.tag}</span>
    );
    const deleteButton = this.props.accessible && this.props.deletable ? (
      <button className="tag-item-delete-button" onClick={this.handleClickDelete}>×</button>
    ) : null;
    return (
      <li className="tag-item">
        {tagName}
        {deleteButton}
      </li>
    );
  }
});

export default TagItem;
