import React from 'react';
import {browserHistory} from 'react-router';
import classnames from 'classnames';

const filters = [
  {
    type: undefined,
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'Article',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'Profile',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'Comment',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'ProfileComment',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'ArticleTag',
    actions: [undefined, 'create']
  },
  {
    type: 'ProfileTag',
    actions: [undefined, 'create']
  },
  {
    type: 'ImageTag',
    actions: [undefined, 'create']
  }
];

function getFilterByType(type) {
  return filters.filter(filter => filter.type === type)[0];
}

const mapping = {
  undefined: '전체',

  // types
  Article: '글',
  Profile: '프로필',
  Comment: '댓글',
  ProfileComment: '프로필댓글',
  ArticleTag: '글 태그',
  ProfileTag: '프로필 태그',
  ImageTag: '이미지 태그',

  // actions
  create: '추가',
  update: '수정'
};

const MainCategoryItem = React.createClass({

  propTypes: {
    onClickMainCategory: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
    filter: React.PropTypes.object
  },

  handleClickItem() {
    this.props.onClickMainCategory(this.props.filter);
  },

  render() {
    const classname = classnames({
      'activity-filter-main-category-item': true,
      'activity-filter-main-category-item-selected': this.props.isSelected
    });
    return (
      <span
        onClick={this.handleClickItem}
        className={classname}
        >
        {mapping[this.props.filter.type]}
      </span>
    );
  }
});

const SubCategoryItem = React.createClass({

  propTypes: {
    onClickSubCategory: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
    action: React.PropTypes.string
  },

  handleClickItem() {
    this.props.onClickSubCategory(this.props.action);
  },

  render() {
    const classname = classnames({
      'activity-filter-sub-category-item': true,
      'activity-filter-sub-category-item-selected': this.props.isSelected
    });
    return (
      <span
        onClick={this.handleClickItem}
        className={classname}
        >
        {mapping[this.props.action]}
      </span>
    );
  }
});

const ActivityFilter = React.createClass({

  propTypes: {
    query: React.PropTypes.object
  },

  getInitialState() {
    const initialType = getFilterByType(this.props.query.type) || filters[0];
    return {
      opened: false,
      previousType: initialType,
      selectedType: initialType,
      selectedAction: this.props.query.action || initialType.actions[0]
    };
  },

  componentWillReceiveProps(props) {
    const initialType = getFilterByType(props.query.filterType) || filters[0];
    this.setState({
      opened: false,
      previousType: initialType,
      selectedType: initialType,
      selectedAction: props.query.filterAction || initialType.actions[0]
    });
  },

  handleClickToggleButton() {
    this.setState({
      opened: !this.state.opened,
      selectedType: this.state.previousType
    });
  },

  handleClickMainCategory(type) {
    this.setState({
      selectedType: type
    });
  },

  handleClickSubCategory(action) {
    this.setState({
      previousType: this.state.selectedType,
      selectedAction: action,
      opened: false
    });
    // push history
    const params = {};
    params.filterType = this.state.selectedType.type;
    params.filterAction = action;
    const paramsString = Object.keys(params).filter(key => {
      return params[key] !== undefined && params[key] !== null;
    }).map(key => {
      return `${key}=${params[key]}`;
    }).reduce((p, c) => {
      return `${c}&${p}`;
    }, '');
    browserHistory.push(`/activities?${paramsString}`);
  },

  render() {
    const mainCategoriesView = filters.map(filter => {
      const isSelected = filter.type === this.state.selectedType.type;
      return (
        <MainCategoryItem
          onClickMainCategory={this.handleClickMainCategory}
          isSelected={isSelected}
          filter={filter}
          key={`main-category-${filter.type}`}
          />
      );
    });
    const subCategoriesView = this.state.selectedType.actions.map(action => {
      const isSelected = action === this.state.selectedAction;
      return (
        <SubCategoryItem
          onClickSubCategory={this.handleClickSubCategory}
          isSelected={isSelected}
          action={action}
          key={`sub-category-${action}`}
          />
      );
    });

    const nav = this.state.opened ? (
      <nav>
        <ul>
          {mainCategoriesView}
        </ul>
        <ul>
          {subCategoriesView}
        </ul>
      </nav>
    ) : null;

    return (
      <header>
        <div>
          <span onClick={this.handleClickToggleButton}>분류</span>
          <input placeholder="프로필"/>
          <button>검색</button>
        </div>
        {nav}
      </header>
    );
  }
});

export default ActivityFilter;
