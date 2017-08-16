import React from 'react';
import {Link} from 'react-router-dom';

const SearchResultLinks = React.createClass({
  renderLink(category, query, page, ch = page) {
    return <Link className="search-link" to={`/search?category=${category}&query=${query}&page=${page}`} key={`search-link-${page}`}>[{ch}]</Link>;
  },

  render() {
    const {category, query, page, count, num} = this.props;
    const linkStep = 10;
    const first = Math.max(0, Math.floor(page / linkStep) * linkStep);
    const last = Math.min(Math.floor((count - 1) / num) + 1,
      (Math.floor(page / linkStep) + 1) * linkStep);
    const frontLink = first === 0 ? null :
      this.renderLink(category, query, first - linkStep, '<');
    const links = [];
    for (let i = first; i < last; i++) {
      links.push(this.renderLink(category, query, i));
    }
    const backLink = last < first + linkStep ? null :
      this.renderLink(category, query, first + linkStep, '>');

    return (
      <section className="search-link-wrapper">
        {frontLink}
        {links}
        {backLink}
      </section>
    );
  }
});

export default SearchResultLinks;
