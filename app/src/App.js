import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './app.scss'
import Home from './pages/home'
import Show from './pages/show'
import BookmarksForm from './pages/bookmarksForm'
import NewList from './pages/newList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/lists" />} />
        <Route path='/lists/new' element= {<NewList />} />
        <Route path='/lists/:id/bookmarks/new' element= {<BookmarksForm />} />
        <Route path='/lists/:id' element= {<Show />} />
        <Route path='/lists' element= {<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
