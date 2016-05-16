  /**
*
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

  handleChange(tags) {
    this.setState({ tags })
  }

  render() {
    return <TagsInput className={ styles.tagBox } value={this.state.tags} onChange={::this.handleChange} />
  }

  //  componentWillMount(nextProps) {
  //    const { tags } = this.props
  //    this.setState({
  //      tags,
  //    })
  //  }
  //
  //  componentWillReceiveProps(nextProps) {
  //    const { tags } = nextProps
  //    this.setState({
  //      tags,
  //    })
  //  }

  //  render() {
  //    const { onSaveTag } = this.props
  //    const { tags } = this.state
  //    return (
  //      <div className={ styles.tags }>
  //        <Input onChange={ this.onTagChange } value={ tags }/>
  //        <Button style={{ marginLeft: 5 }} onClick={ () => saveTags(tags) }>Save tags</Button>
  //      </div>
  //    )
  //  }
}

export default Tags;
