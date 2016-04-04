/**
*
* Input
*
*/

import React from 'react';

import styles from './styles.css';

function Input({ onChange, value, style, className }) {
  return (
    <input
      className={ className || styles.input }
      style={ style }
      onChange={ onChange }
      value={ value}
    />
  );
}

export default Input;
