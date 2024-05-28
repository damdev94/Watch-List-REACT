import React from 'react'
import '../css/components/movieCard.scss'
import DeleteButton from './deleteButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

function MovieCard({movies, bookmarks, handleDeleteBookmark}) {
  return (
    <>
      {movies.map(movie => (
          <div key={movie._id} className='movie-card'>

            <div className="movie-image">
              <img src={movie.poster_url} alt='movie'/>
            </div>

            <div className="movie-infos">
              <div className="title-rating">
                <h3>{movie.title}</h3>
                <div className="rating">
                <FontAwesomeIcon className='star-icon' icon={faStar} />
                  <p>{movie.rating}</p>
                </div>

              </div>
              <div className="overview">
                <p>{movie.overview}</p>
              </div>

                {bookmarks.map(bookmark => (
                  bookmark.movieId === movie._id && (
                    <div key={bookmark._id} className="card-bottom">
                      <div className="comment-container">
                        <FontAwesomeIcon className='quoteIcon' icon={faQuoteLeft} />
                        <p>{bookmark.comment}</p>
                      </div>
                      <div className="delete-bookmark">
                        <DeleteButton handleDelete={handleDeleteBookmark} id={bookmark._id} item= 'movie' />
                      </div>
                    </div>
                  )
                ))}
            </div>




          </div>
        ))}
    </>
  )
}

export default MovieCard
