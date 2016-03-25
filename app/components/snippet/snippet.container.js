import React, { Component } from 'react'
import { connect } from 'react-redux'
import Filter from './elemets/filters'
import SnippetList from 'components/snippet/snippetList'
import { startFetchMiniArticles, setVisibilityFilter, VisibilityFilters } from 'businessLogic/snippets/snippets.actions'
import { initSync, readUsers } from 'businessLogic/firebase/firebase'
import { check } from 'businessLogic/tweeter/tweeterApi'

import Firebase from 'firebase'
var myDataRef = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/70345946');
window._source = 'firebase'


function select(state) {
  return {
    snippetList: selectMiniArticles(state.get('snippetList'), state.get('visibilityFilter')),
    visibilityFilter: state.get('visibilityFilter'),
    likedUserList: state.getIn(['user', 'likedUserList']),
  };
}

export default class MainPage extends Component {

  componentWillMount() {
    const { dispatch } = this.props

    initSync()
    readUsers(dispatch)
    //dispatch(startFetchMiniArticles())

    myDataRef.orderByKey().on("value", function(snapshot) {
      const newData = []
      const data =  snapshot.val()
      for( var tweet in data ) {
        newData.unshift(data[tweet])
      }
      //console.log('------------', newData);
      dispatch({ type: 'FETCH_MINI_ARTICLES_SUCCESS', data: newData })
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  render() {
    const { dispatch, snippetList, visibilityFilter, likedUserList } = this.props
    const data = snippetList.length ? snippetList : []
    const isFetching = !!snippetList.isFetching
    return (
      <div>
        <button onClick={ check }>Check cron</button>
        <SnippetList snippetList={ snippetList } />
        <Filter
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          }
        />
      </div>
    );
  }
}

//<Articles isFetching={isFetching} snippetList={data} likedUserList={ likedUserList }/>

MainPage.propTypes = {
  dispatch: React.PropTypes.func,
  snippetList: React.PropTypes.array,
  visibilityFilter: React.PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE',
  ]).isRequired,
}

function selectMiniArticles(snippetList, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return snippetList
    case VisibilityFilters.SHOW_COMPLETED:
      return snippetList.filter(miniarticle => miniarticle.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return snippetList.filter(miniarticle => !miniarticle.completed);
    default:
      return snippetList
  }
}

export default connect(select)(MainPage)
