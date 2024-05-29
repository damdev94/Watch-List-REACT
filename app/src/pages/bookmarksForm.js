import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../css/pages/bookmarksForm.scss'

function BookmarksForm({handleModal, handleCreateBookmark,}) {

  const params = useParams()
  const id = params.id

  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [comment, setComment] = useState('')

  const options = movies.map(movie => ({
    value: movie._id,
    label: movie.title
  }))

  const handleChange = selectedOption => {
    setSelectedMovie(selectedOption)
  }

  useEffect(() => {
    axios.get(`https://watch-list-api-361e159c2c5a.herokuapp.com/lists/${id}/bookmarks/new`)
    .then(res => {
      setMovies(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()
    const bookmarkData = {
      comment: comment,
      movieId: selectedMovie.value,
      listId: id
    }
    axios.post(`https://watch-list-api-361e159c2c5a.herokuapp.com/lists/${id}/bookmarks/new`, bookmarkData)
    .then(res => {
      console.log('Bookmark created:', res.data)
      handleModal()
      handleCreateBookmark(res.data.bookmark._id)
    })
    .catch(err => {
      console.log(err);
    })
  }


  return (
    <div className='bookmarksForm-container'>
      <h2>make your choice</h2>
      <form className='form-container-bookmark' id='addMovie' onSubmit={handleSubmit}>
      <Select
        className='custom-select'
        value={selectedMovie}
        onChange={handleChange}
        options={options}
        placeholder="Choose a movie"
      />
        <input className='review-input' id="review" name="review" value={comment} placeholder='Enter a message' onChange={(e) => setComment(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default BookmarksForm
