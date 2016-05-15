import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './elemets/filters'
import Search from './elemets/search'
import SearchText from './elemets/searchText'
import SnippetList from 'components/snippet/snippetList'
import { fetchSnippetsStandard, setVisibilityFilter, VisibilityFilters, setVisibilityTextFilter } from 'businessLogic/snippets/snippets.actions'
import { initSync, readUsers } from 'businessLogic/firebase/firebase'
import styles from './styles.css'

import Firebase from 'firebase'
var myDataRef = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/70345946');
window._source = 'firebase'


function select(state) {
  return {
    snippetList: searchText(selectSnippetsList(state.getIn(['snippetReducer', 'snippetList']), state.get('visibilityFilter')), state.getIn(['snippetReducer', 'searchText'])),
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

    //initSync()
    //readUsers(dispatch)
    const query = {
      userName: 'dan_abramov',
      favoriteCount: 10,
      retweetCount: 10,
    }
    dispatch(fetchSnippetsStandard({ source: 'componentWillMount - SnippetContainer', query }))

    //myDataRef.orderByKey().on("value", function(snapshot) {
    //  const newData = []
    //  const data =  snapshot.val()
    //  for( var tweet in data ) {
    //    newData.unshift(data[tweet])
    //  }
    //  //console.log('------------', newData);
    //  dispatch({ type: 'FETCH_MINI_ARTICLES_SUCCESS', data: newData })
    //}, function (errorObject) {
    //  console.log("The read failed: " + errorObject.code);
    //});
  }

  onSearchText = (searchText) => {
    this.setState({
      searchText,
    })
  }

  render() {
    const { dispatch, snippetList, visibilityFilter, likedUserList, snippetIsFetching, snippetFetchingError } = this.props
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

//<Articles isFetching={isFetching} snippetList={data} likedUserList={ likedUserList }/>

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

function searchText(snippetList, searchText) {
  return snippetList.filter(snippet => {
    return snippet.text.match(new RegExp(searchText, 'i'))
  })
}

export default connect(select)(SnippetContainer)
