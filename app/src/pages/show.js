import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import BookmarksForm from '../pages/bookmarksForm'
import Header from '../components/header'
import '../css/pages/show.scss'
import MovieCard from '../components/movieCard'
import CreateButton from '../components/createButton'

function Show() {
  const params = useParams()
  const id = params.id
  const [list, setList] = useState([])
  const [movies, setMovies] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [deletedBookmarkId, setDeletedBookmarkId] = useState(null)
  const [createdBookmarkId, setCreatedBookmarkId] = useState(null)
  const [modal, setModal] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    axios.get(`http://localhost:5000/lists/${id}`)
      .then((res) => {
        console.log(res.data)
        setList(res.data.list)
        setBookmarks(res.data.bookmarks)
        setMovies(res.data.movies)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id, deletedBookmarkId, createdBookmarkId])

  const handleModal = () => {
    setModal(!modal)
  }

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCreateBookmark = (bookmarkId) => {
    console.log(`Bookmark created with ${id}`)
      setCreatedBookmarkId(bookmarkId)
  }
  const handleDeleteBookmark = (id) => {
    console.log("Deleting bookmark with ID:", id)
    axios.delete(`http://localhost:5000/bookmarks/${id}`)
      .then(() => {
        console.log("bookmark has been deleted successfully !")
        setDeletedBookmarkId(id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const displayMovies = () => (
    <div>
      <Header title={list.name} image={`http://localhost:5000/public/images/${list.image}`} />
      <div className="buttons">
        <div className="new-movie-button">
          <CreateButton
            text='Add a movie'
            click={handleModal}
          />
        </div>
      </div>
      <div className="movies-list">
        <MovieCard
          movies={movies}
          bookmarks={bookmarks}
          handleDeleteBookmark={handleDeleteBookmark}
        />
      </div>
    </div>
  )

  return (
    <div>
      {modal && (
        <div className="modal">
          <div ref={modalRef} className="modal-content">
            <BookmarksForm
              handleModal={handleModal}
              handleCreateBookmark={handleCreateBookmark}
            />
          </div>
        </div>
      )}

      <div>
        {displayMovies()}
      </div>
    </div>
  )
}

export default Show
