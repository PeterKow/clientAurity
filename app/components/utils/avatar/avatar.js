import React from 'react'

const imgStyle = {
  borderRadius: '30px',
  float: 'left',
  marginLeft: '-58px',
  marginTop: '0px',
}

export default function Avatar({ src }) {
  return (
    <img style={imgStyle} src={ src } />
  )
}
