import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateGig from './pages/CreateGig'
import Chat from './pages/Chat'
import Admin from './pages/Admin'
import Proposals from './pages/Proposals'
import Profile from './pages/Profile'
import Reviews from './pages/Reviews'
import Notifications from './pages/Notifications'

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}

      <nav className='bg-gradient-to-r from-cyan-500 to-blue-700 p-5 flex flex-wrap gap-6 text-white shadow-lg items-center justify-between rounded-b-2xl'>
        <h1 className='text-3xl font-bold'>
          SkillSphere
        </h1>

        <div className='flex flex-wrap gap-5 text-lg font-semibold'>
          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/'
          >
            Home
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/login'
          >
            Login
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/register'
          >
            Register
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/create-gig'
          >
            Create Gig
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/chat'
          >
            Chat
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/proposals'
          >
            Proposals
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/profile'
          >
            Profile
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/reviews'
          >
            Reviews
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/notifications'
          >
            Notifications
          </Link>

          <Link
            className='hover:text-yellow-300 transition-all duration-300'
            to='/admin'
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* MAIN CONTENT */}

      <div className='p-10 min-h-screen bg-slate-900 text-white'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/login'
            element={<Login />}
          />

          <Route
            path='/register'
            element={<Register />}
          />

          <Route
            path='/create-gig'
            element={<CreateGig />}
          />

          <Route
            path='/chat'
            element={<Chat />}
          />

          <Route
            path='/admin'
            element={<Admin />}
          />

          <Route
            path='/proposals'
            element={<Proposals />}
          />

          <Route
            path='/profile'
            element={<Profile />}
          />

          <Route
            path='/reviews'
            element={<Reviews />}
          />

          <Route
            path='/notifications'
            element={<Notifications />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App