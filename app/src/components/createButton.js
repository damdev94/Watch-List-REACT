import React from 'react'
import { Link } from 'react-router-dom'
import '../css/components/CreateButton.scss'

function CreateButton({address, text, click}) {
  return (
    <Link className='create-button' to={address} onClick={click}> {text} </Link>
  )
}

export default CreateButton
