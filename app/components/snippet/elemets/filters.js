/**
 * Created by Peter on 30/08/15.
 */
import React, { Component, PropTypes } from 'react';

export default class Filter extends Component {
  renderFilter(filter, name) {
    return (
      <a
        href="#"
        style={{ color: filter === this.props.filter ? 'blue' : 'black' }}
        onClick={event => {
          event.preventDefault()
          this.props.onFilterChange(filter)
        }}
      >
        {name}
      </a>
    );
  }

  render() {
    return (
      <div style={{ padding: 5 }}>
        Show:
        {' '}
        {this.renderFilter('SHOW_ALL', 'All')}
        {', '}
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
        {', '}
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
        .
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE',
  ]).isRequired,
}
