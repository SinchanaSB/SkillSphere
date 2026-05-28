import { useState } from 'react'
import API from '../api/api'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer',
    skills: '',
    bio: '',
    location: ''
  })

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', {
        ...form,
        skills: form.skills.split(',')
      })

      alert('Registration Success')
    } catch (error) {
      alert('Registration Failed')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-slate-800 p-10 rounded-2xl shadow-2xl w-[450px] border border-cyan-500'>
        <h1 className='text-4xl font-bold text-cyan-400 mb-8 text-center'>
          Register
        </h1>

        <input
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Name'
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br />
        <br />

        <input
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Email'
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br />
        <br />

        <input
          type='password'
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Password'
          onChange={e =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <br />
        <br />

        <input
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Skills'
          onChange={e =>
            setForm({
              ...form,
              skills: e.target.value
            })
          }
        />

        <br />
        <br />

        <input
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Location'
          onChange={e =>
            setForm({
              ...form,
              location: e.target.value
            })
          }
        />

        <br />
        <br />

        <textarea
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Bio'
          onChange={e =>
            setForm({ ...form, bio: e.target.value })
          }
        />

        <br />
        <br />

        <select
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          onChange={e =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value='freelancer'>
            Freelancer
          </option>

          <option value='client'>
            Client
          </option>

          <option value='admin'>
            Admin
          </option>
        </select>

        <br />
        <br />

        <button
          className='w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-3 rounded-lg text-lg font-bold'
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Register