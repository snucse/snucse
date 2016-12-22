import React from 'react';
import {browserHistory} from 'react-router';

import {connectModals} from '../../utils';
import TagContainer from './TagContainer';

const TagInfo = React.createClass({
  render() {
    if (!(this.props.location.query && this.props.location.query.tag)) {
      this.props.alertModal('알림', '정상적이지 않은 접근입니다.', () => {
        browserHistory.goBack();
      });
      return null;
    }

    return <TagContainer tagName={this.props.location.query.tag}/>;
  }
});

export default connectModals(TagInfo);
