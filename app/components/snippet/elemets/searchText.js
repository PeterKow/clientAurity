import React, { Component } from 'react'
import Button from 'components/Button'
import Input from 'components/Input'
import styles from './styles.css'
import { connect } from 'react-redux'
import { fetchSnippetsStandard } from 'businessLogic/snippets/snippets.actions'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }

  onChange = event => {
    const { onChange } = this.props
    const text = event.target.value
    this.setState({ text })
    onChange(text)
  }

  render() {
    const { userName } = this.state
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        Text:
        <Input className={ styles.smallInput } onChange={ this.onChange } value={ userName } />
      </div>
    )
  }
}

export default connect(() => { return {} })(Search)
