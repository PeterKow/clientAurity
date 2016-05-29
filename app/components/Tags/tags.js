/**
* Tags
*
*/

import React, { Component } from 'react'
import TagsInput from 'react-tagsinput'
import styles from './styles.css'

class Tags extends Component {

  constructor() {
    super()
    this.state = { tags: [] }
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

  save = (tags) => {
    const { updateTags } = this.props
    updateTags(tags)
  }

  onBlur = () => {
    const { updateTags } = this.props
    const { tags } = this.state
    updateTags(tags)
  }

  handleChange = tags => {
    this.setState({ tags })
    const { updateTags } = this.props
    updateTags(tags)
  }

  render() {
    return (
      <TagsInput
        className={ styles.tagBox }
        value={this.state.tags}
        onChange={this.handleChange}
        onBlur={ this.onBlur }
        onlyUnique={ true }
        addOnPaste={ true }
      />
    )
  }
}

Tags.propTypes = {
  updateTags: React.PropTypes.func.isRequired,
  tags: React.PropTypes.array.isRequired,
}

export default Tags;
