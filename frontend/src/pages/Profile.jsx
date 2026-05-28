import {
  useState
} from 'react'

import API from '../api/api'

function Profile() {
  const [
    experience,
    setExperience
  ] = useState('')

  const [
    hourlyRate,
    setHourlyRate
  ] = useState('')

  const [
    portfolio,
    setPortfolio
  ] = useState('')

  const [
    certifications,
    setCertifications
  ] = useState('')

  const handleSave =
    async () => {
      try {
        const userId =
          localStorage.getItem(
            'userId'
          )

        await API.put(
          `/profile/${userId}`,
          {
            experience,
            hourlyRate,
            portfolio:
              portfolio.split(','),
            certifications:
              certifications.split(
                ','
              )
          }
        )

        alert(
          'Profile Updated'
        )
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='max-w-3xl mx-auto bg-slate-800 p-10 rounded-2xl border border-cyan-500 shadow-2xl'>
      <h1 className='text-5xl font-bold text-cyan-400 mb-10'>
        Freelancer Profile
      </h1>

      <input
        className='w-full p-4 bg-slate-700 rounded-xl mb-5'
        placeholder='Experience'
        onChange={e =>
          setExperience(
            e.target.value
          )
        }
      />

      <input
        className='w-full p-4 bg-slate-700 rounded-xl mb-5'
        placeholder='Hourly Rate'
        onChange={e =>
          setHourlyRate(
            e.target.value
          )
        }
      />

      <textarea
        className='w-full p-4 bg-slate-700 rounded-xl mb-5'
        placeholder='Portfolio Links separated by commas'
        onChange={e =>
          setPortfolio(
            e.target.value
          )
        }
      />

      <textarea
        className='w-full p-4 bg-slate-700 rounded-xl mb-5'
        placeholder='Certifications separated by commas'
        onChange={e =>
          setCertifications(
            e.target.value
          )
        }
      />

      <button
        onClick={handleSave}
        className='bg-cyan-500 px-6 py-3 rounded-xl font-bold'
      >
        Save Profile
      </button>
    </div>
  )
}

export default Profile