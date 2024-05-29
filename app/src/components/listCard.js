import React from 'react'
import '../css/components/listCard.scss'
import { Link } from 'react-router-dom'
import DeleteButton from './deleteButton'

function ListCard({id, image, name, handleDelete}) {
  return (
    <div className="ListCard-link">
      <Link to={`/lists/${id}`} className="ListCard-link">
        <div
          key={id}
          className="ListCard-container"
          style={{ backgroundImage: `url(https://watch-list-api-361e159c2c5a.herokuapp.com/public/images/${image})` }}
        >
          <div className="listCard-title">
            <p key={id}>{name}</p>
          </div>
        </div>
      </Link>
      <div className="listCard-delete">
        <DeleteButton handleDelete={handleDelete} id={id} item="list" />
      </div>
    </div>
  )
}

export default ListCard
