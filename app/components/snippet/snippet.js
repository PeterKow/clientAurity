import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Avatar from 'components/utils/avatar/avatar'
import Image from 'components/utils/image/image'
import Linkify from 'react-linkify'
import TextLink from './elemets/text-link'
import Tags from 'components/Tags/tags'

export default class Snippet extends Component {
  onTagChange = (e) => {
    this.setState({ tags: e.target.value })
  }

  render() {
    function getImage(image) {
      return image ? (
        <div style={{ overflow: 'hidden', position: 'relative', height: '15em' }}>
          <Image src={ image } />
        </div>
      ) : ''
    }

    const { quotedStatus, created_at, onThumbDown, onThumbUp, onStared, tags } = this.props
    const { idStr, user, onClick, thumbDown, thumbUp, stared, profileImage } = this.props
    const { favoriteCount, image, text } = this.props

    return (
      <li style={styles(this.props.completed)} >
        <div style={{ padding: '9px 12px' }} >
          <div style={{ marginLeft: 58 }}>
            <Avatar src={ profileImage } />
            <div id="manage">
              { user.screenName }
              <a target="_blank" href={`https://twitter.com/${user.screenName}/status/${idStr}`}>
                Twitter
              </a>
              <span
                style={{ borderRadius: 5, padding: 4, paddingLeft: 10, paddingRight: 10,
                backgroundColor: 'greenyellow', margin: '0 10px' }}
                onClick={ onClick }
              >
                DONE
              </span>
              <span style={ getStyle(thumbDown) } onClick={ onThumbDown }>{ showThumbDown() }</span>
              <span style={ getStyle(thumbUp) } onClick={ onThumbUp }>{ showThumbUp() }</span>
              <span style={ getStyle(stared) } onClick={ onStared }>{ showStar() }</span>
              <span style={{ marginLeft: 10 }}>{
                moment(created_at).format('MMMM DD YYYY, h:mm a')
              }</span>
            </div>
            <Tags tags={ tags } />

            <Linkify target="_blank">{ text }</Linkify><br />
            { quotedStatus ? <TextLink content={ quotedStatus } /> : '' }
            Favorite: <b>{favoriteCount}</b> Retweet: <b>{this.props.retweetCount}</b>
            { getImage(image) }
          </div>
        </div>
        <hr style={{ borderTop: '3px solid #CCC' }} />
      </li>
    );
  }
}

function styles(completed) {
  return {
    textDecoration: completed ? 'line-through' : 'none',
    cursor: completed ? 'default' : 'pointer',
    listStyleType: 'none',
  };
}

Snippet.defaultProps = {
  user: {
    screenName: 'dan_abramov',
  },
}

Snippet.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  profileImage: PropTypes.string,
  tags: PropTypes.string,
  image: PropTypes.string,
  favoriteCount: PropTypes.number.isRequired,
  retweetCount: PropTypes.number.isRequired,
  quotedStatus: PropTypes.object,
  connectDragSource: PropTypes.func,
}

function getStyle(mark) {
  const style = { margin: '0 10px', backgroundColor: mark ? 'dodgerblue' : 'transparent' }
  return style
}

function showStar(stared) {
  return stared ? '⭐' : ' ⭐';
}

function showThumbUp(thumbUp) {
  return thumbUp ? '👍' : '👍'
}

function showThumbDown(thumbDown) {
  return thumbDown ? '👎' : '?';
}
