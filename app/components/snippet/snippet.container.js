import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './elemets/filters'
import Search from './elemets/search'
import SearchText from './elemets/searchText'
import SnippetList from 'components/snippet/snippetList'
import { fetchSnippetsStandard, setVisibilityFilter, VisibilityFilters, setVisibilityTextFilter }
  from 'businessLogic/snippets/snippets.actions'
import styles from './styles.css'

function select(state) {
  return {
    snippetList: searchText(selectSnippetsList(state.getIn(['snippetReducer', 'snippetList']),
      state.get('visibilityFilter')), state.getIn(['snippetReducer', 'searchText'])),
    snippetIsFetching: state.getIn(['snippetReducer', 'isFetching']),
    snippetFetchingError: state.getIn(['snippetReducer', 'errorMessage']),
    visibilityFilter: state.get('visibilityFilter'),
    searchText: state.get('searchText'),
    likedUserList: state.getIn(['user', 'likedUserList']),
  };
}

export default class SnippetContainer extends Component {

  componentWillMount() {
    const { dispatch } = this.props
    const query = {
      userName: 'dan_abramov',
      favoriteCount: 10,
      retweetCount: 10,
    }
    dispatch(fetchSnippetsStandard({ source: 'componentWillMount - SnippetContainer', query }))
  }

  onSearchText = (newSearchText) => {
    this.setState({
      searchText: newSearchText,
    })
  }

  render() {
    const { dispatch, snippetList, visibilityFilter, snippetIsFetching,
      snippetFetchingError } = this.props
    return (
      <div>
        <Filter
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          }
        />
        <Search />
        <SearchText onChange={ (text) => dispatch(setVisibilityTextFilter(text)) } />
        { snippetFetchingError ?
          <div className={ styles.noData }>{ snippetFetchingError } </div> :
          <div>
            <b>Total tweets: { snippetList.size }</b>
            <SnippetList
              dispatch={ dispatch }
              snippetList={ snippetList }
              isFetching={ snippetIsFetching }
            />
          </div>
        }
      </div>
    );
  }
}

SnippetContainer.propTypes = {
  dispatch: React.PropTypes.func,
  snippetList: React.PropTypes.object,
  visibilityFilter: React.PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE',
  ]).isRequired,
}

function selectSnippetsList(snippetList, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return snippetList
    case VisibilityFilters.SHOW_COMPLETED:
      return snippetList.filter(snippet => snippet.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return snippetList.filter(snippet => !snippet.completed);
    default:
      return snippetList
  }
}

function searchText(snippetList, searchTextValue) {
  return snippetList.filter(snippet => snippet.text.match(new RegExp(searchTextValue, 'i')))
}

export default connect(select)(SnippetContainer)
