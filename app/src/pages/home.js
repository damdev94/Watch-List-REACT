import React, { useState, useEffect, useRef} from 'react'
import '../css/pages/home.scss'
import axios from 'axios'
import Header from '../components/header'
import ListCard from '../components/listCard'
import CreateButton from '../components/createButton'
import NewList from './newList'

const headerImage = '/images/homepage.jpeg'


function Home() {

  const [lists, setLists] = useState([])
  const [updateList, setUpdateList] = useState([])
  const [modal, setModal] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    axios.get("https://watch-list-api-361e159c2c5a.herokuapp.com/lists")
      .then(res => {
        setLists(res.data);
      })
      .catch(error => {
        console.error("Error fetching lists:", error);
      })
  }, [updateList])

  const handleUpdateList = (id) => {
    setUpdateList(id)
  }


  const handleDeleteList = (id) => {
    axios.delete(`https://watch-list-api-361e159c2c5a.herokuapp.com/lists/${id}`)
    .then(res => {
      console.log("The list has been deleted succefully !")
      setLists(prevLists => prevLists.filter(list => list._id !== id))
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleModal = () => {
    setModal(!modal)
  }

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayListMenu = () => {
    return(
      <div>
        <Header title="Save any kind of movies" image={headerImage} />
        <div className="container">
          <div className="header-list">
            <h1>MyLists</h1>
            <CreateButton
              text="Create movie list"
              click={handleModal}
            />
          </div>
          <div className="list-lists">
            {lists.map(list => (
              <ListCard
                key={list._id}
                id={list._id}
                image={list.image}
                name={list.name}
                handleDelete={handleDeleteList}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {modal && (
        <div className="modal">
          <div ref={modalRef} className="modal-content">
            <NewList
              handleModal={handleModal}
              handleUpdateList={handleUpdateList}
            />
          </div>
        </div>
      )}

      <div>
        {displayListMenu()}
      </div>
    </div>
  );
}

export default Home
