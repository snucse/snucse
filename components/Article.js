import React from 'react';
import {connect} from 'react-redux';

import {loadArticle} from '../actions/dispatchers';
import {ArticleItem, ArticleLoading, ArticleNotFound} from './ArticleItem';

const Article = React.createClass({

  componentDidMount() {
    this.props.loadArticle(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (props.id !== this.props.id) {
      this.props.loadArticle(props.id);
    }
  },

  render() {
    let view = null;
    if (this.props.isError) {
      view = <ArticleNotFound/>;
    } else if (this.props.article === null) {
      view = <ArticleLoading/>;
    } else {
      view = <ArticleItem article={this.props.article}/>;
    }
    return (
      <section className="article-view">
        {view}
      </section>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    article: state.article.article,
    isError: state.article.isError
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadArticle: id => loadArticle(dispatch, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
