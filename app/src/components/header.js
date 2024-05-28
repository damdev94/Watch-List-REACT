import React from 'react'
import '../css/components/header.scss'

function Header({title, image}) {
  return (
    <div className='header-container' style={{backgroundImage: `url(${image})` }}>
      <h2>{title}</h2>
    </div>
  )
}

export default Header
