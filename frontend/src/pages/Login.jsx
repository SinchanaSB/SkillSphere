import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import API from '../api/api'

function Login() {
  const [email, setEmail] =
    useState('')

  const [
    password,
    setPassword
  ] = useState('')

  const navigate =
    useNavigate()

  const handleLogin =
    async () => {
      try {
        const res =
          await API.post(
            '/auth/login',
            {
              email,
              password
            }
          )

        localStorage.setItem(
          'token',
          res.data.token
        )

        localStorage.setItem(
          'userId',
          res.data.user._id
        )

        alert(
          'Login Successful'
        )

        navigate('/')
      } catch (error) {
        console.log(error)

        alert(
          'Login Failed'
        )
      }
    }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-slate-800 p-10 rounded-2xl shadow-2xl w-[400px] border border-cyan-500'>
        <h1 className='text-4xl font-bold text-cyan-400 mb-8 text-center'>
          Login
        </h1>

        <input
          className='w-full p-3 rounded-lg bg-slate-700 text-white'
          placeholder='Email'
          onChange={e =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type='password'
          className='w-full p-3 rounded-lg bg-slate-700 text-white'
          placeholder='Password'
          onChange={e =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          className='w-full bg-cyan-500 py-3 rounded-lg text-lg font-bold'
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login