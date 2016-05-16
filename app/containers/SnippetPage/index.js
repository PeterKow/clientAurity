/*
 *
 * SnippetPage
 *
 */

import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'
import snippetSelector from 'snippetSelector'

import styles from './styles.css'

export function SnippetPage() {
  return (
    <div className={ styles.snippetPage }>
      <h1>Hello me</h1>
    </div>
  )
}

const mapStateToProps = createSelector(
  snippetSelector,
  (snippet) => ({ snippet })
)

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetPage)
