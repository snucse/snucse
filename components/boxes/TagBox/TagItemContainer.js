import React from 'react';

import TagItem from './TagItem';

const TagItemContainer = React.createClass({

  propTypes: {
    id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    tag: React.PropTypes.object.isRequired,
    accessible: React.PropTypes.bool,
    deletable: React.PropTypes.bool,
    deleteTag: React.PropTypes.func
  },

  handleDelete(tagName) {
    this.props.deleteTag(this.props.id, tagName);
  },

  render() {
    return (
      <TagItem
        tag={this.props.tag}
        accessible={this.props.accessible}
        deletable={this.props.deletable}
        onDelete={this.handleDelete}
        />
    );
  }
});

export default TagItemContainer;
