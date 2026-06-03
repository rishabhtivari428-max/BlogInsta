import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 pt-16 pb-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-6xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            Welcome to BlogInsta
          </h1>
          <p className='text-xl md:text-2xl text-indigo-100 mb-12 font-light'>
            Share your thoughts, connect with readers, and build your community
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            {user ? (
              <>
                <Link 
                  to='/dashboard' 
                  className='bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg'
                >
                  Go to Dashboard
                </Link>
                <Link 
                  to='/create' 
                  className='bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition transform hover:scale-105'
                >
                  Write a Blog
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to='/register' 
                  className='bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg'
                >
                  Get Started Now
                </Link>
                <Link 
                  to='/login' 
                  className='bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition transform hover:scale-105'
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='max-w-6xl mx-auto px-8 py-20'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-800 mb-4'>Why Choose BlogInsta?</h2>
          <p className='text-xl text-gray-600 font-light'>Everything you need to share and connect</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Feature 1 */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105'>
            <div className='text-5xl mb-4'>📝</div>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Write Freely</h3>
            <p className='text-gray-600'>
              Express yourself with our intuitive blogging platform. Write, edit, and publish your thoughts instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105'>
            <div className='text-5xl mb-4'>👥</div>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Connect & Follow</h3>
            <p className='text-gray-600'>
              Build your community by following other writers, discovering new perspectives, and building meaningful connections.
            </p>
          </div>

          {/* Feature 3 */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105'>
            <div className='text-5xl mb-4'>❤️</div>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Engage & React</h3>
            <p className='text-gray-600'>
              Like, comment, and share your thoughts on blogs. Show appreciation for content you love.
            </p>
          </div>

          {/* Feature 4 */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105'>
            <div className='text-5xl mb-4'>💬</div>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Comment & Discuss</h3>
            <p className='text-gray-600'>
              Join conversations, share ideas, and engage with the community through thoughtful comments.
            </p>
          </div>

          {/* Feature 5 */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105'>
            <div className='text-5xl mb-4'>🎨</div>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Beautiful Design</h3>
            <p className='text-gray-600'>
              Clean, modern interface that makes reading and writing a pleasure. Optimized for all devices.
            </p>
          </div>

          {/* Feature 6 */}
          <div className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105'>
            <div className='text-5xl mb-4'>🚀</div>
            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Get Discovered</h3>
            <p className='text-gray-600'>
              Share your content with a growing community of readers and writers. Build your audience.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-16 mt-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold text-white mb-6'>Ready to Start Blogging?</h2>
          <p className='text-xl text-indigo-100 mb-10 font-light'>
            Join thousands of writers and readers sharing their stories today
          </p>
          {!user && (
            <Link 
              to='/register' 
              className='inline-block bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg'
            >
              Create Your Account Now
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 text-gray-300 py-12 px-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
            <div>
              <h4 className='text-white font-bold mb-4'>BlogInsta</h4>
              <p className='text-sm'>Share your stories with the world</p>
            </div>
            <div>
              <h4 className='text-white font-bold mb-4'>Product</h4>
              <ul className='space-y-2 text-sm'>
                <li><Link to='/home' className='hover:text-white transition'>Home</Link></li>
                <li><Link to='/login' className='hover:text-white transition'>Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-bold mb-4'>Community</h4>
              <ul className='space-y-2 text-sm'>
                <li><a href='#' className='hover:text-white transition'>Browse Blogs</a></li>
                <li><a href='#' className='hover:text-white transition'>Find Writers</a></li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-bold mb-4'>About</h4>
              <ul className='space-y-2 text-sm'>
                <li><a href='#' className='hover:text-white transition'>Contact</a></li>
                <li><a href='#' className='hover:text-white transition'>Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-700 pt-8 text-center text-sm'>
            <p>&copy; 2026 BlogInsta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home