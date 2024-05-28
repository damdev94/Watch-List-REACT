import React from 'react'
import '../css/components/deleteButton.scss'

function DeleteButton({handleDelete, id, item}) {
  return (
    <div className='delete-button'>
      <button  onClick={() => handleDelete(id)}>{`Delete ${item}`}</button>
    </div>
  )
}

export default DeleteButton
