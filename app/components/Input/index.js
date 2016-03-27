/**
*
* Input
*
*/

import React from 'react';

import styles from './styles.css';

function Input({ onChange, value }) {
  return (
    <input
      className={ styles.input }
      onChange={ onChange }
      value={ value}
    />
  );
}

export default Input;
