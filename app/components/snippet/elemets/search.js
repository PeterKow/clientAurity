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
      userName: 'dan_abramov',
      retweetCount: 10,
      favoriteCount: 10,
    }
  }

  onUserChange = event => {
    this.setState({ userName: event.target.value })
  }

  onRetweetsChange = event => {
    this.setState({ retweetCount: event.target.value })
  }

  onFavouritesChange = event => {
    this.setState({ favoriteCount: event.target.value })
  }

  handleSearch = () => {
    const { dispatch } = this.props
    const { userName, retweetCount, favoriteCount } = this.state
    dispatch(fetchSnippetsStandard({ query: { userName, retweetCount, favoriteCount } }))
  }

  render() {
    const { userName, retweetCount, favoriteCount } = this.state
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        User:
        <Input className={ styles.smallInput } onChange={ this.onUserChange } value={ userName } />
        <span style={{ marginLeft: 5, marginRight: 5 }}>
          Retweets:
          <Input className={ styles.smallInput } onChange={ this.onRetweetsChange } value={ retweetCount } />
        </span>
        <span style={{ marginLeft: 5, marginRight: 5 }}>
          Favourites:
          <Input className={ styles.smallInput } onChange={ this.onFavouritesChange } value={ favoriteCount } />
        </span>
        <Button className={ styles.searchButton } onClick={ this.handleSearch } >Search</Button>
      </div>
    )
  }
}

export default connect(() => { return {} })(Search)