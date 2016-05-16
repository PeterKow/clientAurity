/*
 *
 * MainPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchTest } from 'dbTweets'

import { createSelector } from 'reselect';
import mainSelector from 'mainSelector';

import Button from 'Button';
import SnippetContainer from 'components/snippet/snippet.container'
import styles from './styles.css';
import DataSource from 'components/data-source/data-source'

function MainPage({ dispatch }) {
  return (
    <div className={ styles.mainPage }>
      <DataSource />
      <SnippetContainer />
      <Button onClick={ () => dispatch(push('/home')) } >Go to home</Button>
      <Button onClick={ () => dispatch(fetchTest()) } >Fetch test</Button>
    </div>
  )
}

const mapStateToProps = createSelector(
  mainSelector,
  (main) => ({ main })
)

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
