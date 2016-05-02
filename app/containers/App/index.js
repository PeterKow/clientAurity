/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styles from './styles.css';

export default function App({ children }) {
  return (
    <div>
      <div styles={styles.containerMain}>
        {/* this will render the child routes */}
        {children}
      </div>
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
}

export default App;
