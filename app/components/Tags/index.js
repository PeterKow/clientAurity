/**
*
* Tags
*
*/

import React, { Component } from 'react';
import Button from 'components/Button'
import Input from 'components/Input'

import styles from './styles.css';

class Tags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: '',
    }
  }

  componentWillMount(nextProps) {
    const { tags } = this.props
    this.setState({
      tags,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { tags } = nextProps
    this.setState({
      tags,
    })
  }

  render() {
    const { onSaveTag } = this.props
    const { tags } = this.state
    return (
      <div className={ styles.tags }>
        <Input onChange={ this.onTagChange } value={ tags }/>
        <Button style={{ marginLeft: 5 }} onClick={ () => saveTags(tags) }>Save tags</Button>
      </div>
    )
  }
}

export default Tags;
