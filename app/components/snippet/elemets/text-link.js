import React from 'react'
import Linkify from 'react-linkify'

const styles = {
  backgroundColor: 'rgba(238, 234, 234, 0.65)',
  padding: '0.7em',
  borderRadius: '0.5em',
  borderColor: 'lightgray',
  borderWidth: 1,
  borderStyle: 'solid',
}

export default function TextLink(data) {
  return (
    <div style={ styles }>
      <Linkify>{ data.content.text }</Linkify>
    </div>
  )
}
