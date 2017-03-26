import React from 'react';

import {UserLevel} from '../../../utils';
import TagItem from './TagItem';

const TagItemContainer = React.createClass({

  propTypes: {
    id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    tag: React.PropTypes.object.isRequired,
    userLevel: React.PropTypes.number,
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
        accessible={UserLevel.tagAccessible(this.props.userLevel)}
        deletable={this.props.deletable}
        onDelete={this.handleDelete}
        />
    );
  }
});

export default TagItemContainer;
