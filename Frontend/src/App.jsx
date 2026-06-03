import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import CreateBlog from './features/auth/pages/CreateBlog'
import EditBlog from './features/auth/pages/EditBlog'
import Dashboard from './features/auth/pages/Dashboard'
import FollowsPage from './features/follows/pages/FollowsPage'
import LikesPage from './features/likes/pages/LikesPage'
import CommentsPage from './features/comments/pages/CommentsPage'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Home from './features/auth/pages/Home'
import SearchResults from './features/auth/pages/SearchResults'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/search' element={<SearchResults />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
      <Route path='/create' element={<ProtectedRoutes><CreateBlog /></ProtectedRoutes>} />
      <Route path='/edit/:id' element={<ProtectedRoutes><EditBlog /></ProtectedRoutes>} />
      <Route path='/follows' element={<ProtectedRoutes><FollowsPage /></ProtectedRoutes>} />
      <Route path='/likes' element={<ProtectedRoutes><LikesPage /></ProtectedRoutes>} />
      <Route path='/comments' element={<ProtectedRoutes><CommentsPage /></ProtectedRoutes>} />
    </Routes>
    </div>
  )
}

export default App