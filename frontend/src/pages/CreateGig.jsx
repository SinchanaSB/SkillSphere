import { useState } from 'react'

import API from '../api/api'

function CreateGig() {
  const [gig, setGig] =
    useState({
      title: '',
      description: '',
      budget: '',
      skillsRequired: '',
      location: ''
    })

  const handleSubmit =
    async () => {
      try {
        /* GET LOGGED USER ID */

        const userId =
          localStorage.getItem(
            'userId'
          )

        /* CREATE GIG */

        await API.post('/gigs', {
          ...gig,

          skillsRequired:
            gig.skillsRequired.split(
              ','
            ),

          createdBy: userId
        })

        alert(
          'Gig Created Successfully'
        )

        /* CLEAR FORM */

        setGig({
          title: '',
          description: '',
          budget: '',
          skillsRequired: '',
          location: ''
        })
      } catch (error) {
        console.log(error)

        alert(
          'Error Creating Gig'
        )
      }
    }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-slate-800 p-10 rounded-2xl shadow-2xl w-[450px] border border-cyan-500'>
        <h1 className='text-4xl font-bold text-cyan-400 mb-8 text-center'>
          Create Gig
        </h1>

        {/* TITLE */}

        <input
          value={gig.title}
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Title'
          onChange={e =>
            setGig({
              ...gig,
              title:
                e.target.value
            })
          }
        />

        <br />
        <br />

        {/* DESCRIPTION */}

        <textarea
          value={gig.description}
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Description'
          onChange={e =>
            setGig({
              ...gig,
              description:
                e.target.value
            })
          }
        />

        <br />
        <br />

        {/* BUDGET */}

        <input
          value={gig.budget}
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Budget'
          onChange={e =>
            setGig({
              ...gig,
              budget:
                e.target.value
            })
          }
        />

        <br />
        <br />

        {/* SKILLS */}

        <input
          value={
            gig.skillsRequired
          }
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Skills Required'
          onChange={e =>
            setGig({
              ...gig,
              skillsRequired:
                e.target.value
            })
          }
        />

        <br />
        <br />

        {/* LOCATION */}

        <input
          value={gig.location}
          className='w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600'
          placeholder='Location'
          onChange={e =>
            setGig({
              ...gig,
              location:
                e.target.value
            })
          }
        />

        <br />
        <br />

        {/* BUTTON */}

        <button
          className='w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-3 rounded-lg text-lg font-bold'
          onClick={handleSubmit}
        >
          Create Gig
        </button>
      </div>
    </div>
  )
}

export default CreateGig