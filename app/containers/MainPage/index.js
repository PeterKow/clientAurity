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
import styles from './styles.css';

class MainPage extends React.Component {
  render() {
    const { dispatch } = this.props
    return (
      <div className={ styles.mainPage }>
        <Button onClick={ () => dispatch(push('/home')) } >Go to home</Button>
        <Button onClick={ () => dispatch(fetchTest()) } >Fetch test</Button>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  mainSelector,
  (main) => ({ main })
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
