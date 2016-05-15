import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { setTwitterSource, setDbSource } from 'containers/MainPage/actions'
import mainSelector from 'selectors/mainSelector'

function select(state) {
  return {
    dataSource: state.get('dataSource'),
  };
}

function DataSource({ dataSource, dispatch }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
      <a
        href="#"
        style={{ color: dataSource === 'DB data' ? 'red' : 'black' }}
        onClick={event => {
          event.preventDefault()
          dispatch(setDbSource())
        }}
      >
        DB data
      </a>
      <a
        href="#"
        style={{ color: dataSource === 'Twitter' ? 'red' : 'black', paddingLeft: 10 }}
        onClick={event => {
          event.preventDefault()
          dispatch(setTwitterSource())
        }}
      >
        Twitter
      </a>
    </div>
  )
}

DataSource.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  dataSource: React.PropTypes.string.isRequired,
}

export default connect(createSelector(
  mainSelector,
  select
))(DataSource)
