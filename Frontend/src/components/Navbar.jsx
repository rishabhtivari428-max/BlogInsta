import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

const Navbar = () => {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const onLogout = async () => {
    await handleLogout()
    navigate('/home')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-4 md:px-8 py-4 shadow-lg'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link to='/home' className='text-2xl font-bold text-white hover:text-indigo-200 transition'>
            📝 BlogInsta
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className='hidden md:flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 hover:bg-opacity-30 transition'>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className='bg-transparent text-white placeholder-indigo-100 outline-none w-48 font-medium'
            />
            <button type="submit" className='text-white hover:text-indigo-200 transition text-lg'>
              🔍
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex gap-6 items-center text-white font-semibold'>
            <Link to='/home' className='hover:text-indigo-200 transition'>Home</Link>
            
            {user ? (
              <>
                <Link to='/dashboard' className='hover:text-indigo-200 transition'>Dashboard</Link>
                <Link to='/create' className='hover:text-indigo-200 transition'>✍️ Write</Link>
                <Link to='/follows' className='hover:text-indigo-200 transition'>👥 Follows</Link>
                <Link to='/likes' className='hover:text-indigo-200 transition'>❤️ Likes</Link>
                <Link to='/comments' className='hover:text-indigo-200 transition'>💬 Comments</Link>
                
                <div className='flex items-center gap-3 pl-4 border-l border-indigo-400'>
                  <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600'>
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className='text-sm'>{user.username}</span>
                </div>

                <button 
                  onClick={onLogout}
                  className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='hover:text-indigo-200 transition'>Login</Link>
                <Link to='/register' className='bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-100 transition'>
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden text-white text-2xl'>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className='md:hidden mt-4 space-y-3 pb-4 border-t border-indigo-400 pt-4'>
            <form onSubmit={handleSearch} className='flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 py-2 mb-3'>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs..."
                className='bg-transparent text-white placeholder-indigo-100 outline-none flex-1 font-medium'
              />
              <button type="submit" className='text-white hover:text-indigo-200 transition text-lg'>
                🔍
              </button>
            </form>

            <Link to='/home' className='block text-white hover:text-indigo-200 transition'>Home</Link>
            
            {user ? (
              <>
                <Link to='/dashboard' className='block text-white hover:text-indigo-200 transition'>Dashboard</Link>
                <Link to='/create' className='block text-white hover:text-indigo-200 transition'>✍️ Write Blog</Link>
                <Link to='/follows' className='block text-white hover:text-indigo-200 transition'>👥 Follows</Link>
                <Link to='/likes' className='block text-white hover:text-indigo-200 transition'>❤️ Likes</Link>
                <Link to='/comments' className='block text-white hover:text-indigo-200 transition'>💬 Comments</Link>
                
                <div className='flex items-center gap-3 py-3 px-3 bg-indigo-700 rounded-lg'>
                  <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-indigo-600'>
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className='text-sm text-white'>{user.username}</span>
                </div>

                <button 
                  onClick={onLogout}
                  className='w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-semibold'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='block text-white hover:text-indigo-200 transition'>Login</Link>
                <Link to='/register' className='block bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-100 transition text-center'>
                  Register
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </div>
  )
}

export default Navbar