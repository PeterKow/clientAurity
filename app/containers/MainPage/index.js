/*
 *
 * MainPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import mainSelector from 'mainSelector';

import styles from './styles.css';

class MainPage extends React.Component {
  render() {
    return (
      <div className={ styles.mainPage }>
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
