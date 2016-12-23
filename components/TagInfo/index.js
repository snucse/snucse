import React from 'react';

import {connectModals} from '../../utils';
import TagContainer from './TagContainer';

const TagInfo = React.createClass({
  render() {
    return <TagContainer tagName={this.props.location.query.tag}/>;
  }
});

export default connectModals(TagInfo);
