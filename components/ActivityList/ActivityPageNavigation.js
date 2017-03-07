import React from 'react';
import {Link} from 'react-router';

const ActivityPageNavigation = React.createClass({

  propTypes: {
    count: React.PropTypes.number,
    query: React.PropTypes.object
  },

  renderLink(query, page, ch = page) {
    query = {...query, ...{page}};
    const paramsString = Object.keys(query).filter(key => {
      return query[key] !== undefined && query[key] !== null;
    }).map(key => {
      return `${key}=${query[key]}`;
    }).join('&');
    return <Link className="activity-page" to={`/activities?${paramsString}`} key={`activities-link-${page}`}>[{ch}]</Link>;
  },

  render() {
    const count = this.props.count;
    // fixme
    const {query} = this.props;
    const page = query.page || 0;
    const limit = query.limit || 10;
    const linkStep = 10;
    const first = Math.max(0, Math.floor(page / linkStep) * linkStep);
    const last = Math.min(Math.floor((count - 1) / limit) + 1,
      (Math.floor(page / linkStep) + 1) * linkStep);
    const frontLink = first === 0 ? null :
      this.renderLink(query, first - linkStep, '<');
    const links = [];
    for (let i = first; i < last; i++) {
      links.push(this.renderLink(query, i));
    }
    const backLink = last < first + linkStep ? null :
      this.renderLink(query, first + linkStep, '>');
    return (
      <footer id="activity-page-wrapper">
        {frontLink}
        {links}
        {backLink}
      </footer>
    );
  }
});

export default ActivityPageNavigation;
