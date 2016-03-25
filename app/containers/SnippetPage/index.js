/*
 *
 * SnippetPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import snippetSelector from 'snippetSelector';

import styles from './styles.css';

class SnippetPage extends React.Component {
  render() {
    return (
      <div className={ styles.snippetPage }>
        Hello me

      </div>
    );
  }
}

const mapStateToProps = createSelector(
  snippetSelector,
  (snippet) => ({ snippet })
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnippetPage);
