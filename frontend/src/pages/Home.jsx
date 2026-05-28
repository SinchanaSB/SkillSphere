import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import API from '../api/api'

function Home() {
  const [gigs, setGigs] =
    useState([])

  const [search, setSearch] =
    useState('')

  const [
    locationFilter,
    setLocationFilter
  ] = useState('')

  const [
    budgetFilter,
    setBudgetFilter
  ] = useState('')

  const navigate =
    useNavigate()

  useEffect(() => {
    fetchGigs()
  }, [])

  const fetchGigs = async () => {
    try {
      const res =
        await API.get('/gigs')

      setGigs(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  /* FILTERS */

  const filteredGigs =
    gigs.filter(gig => {
      const title =
        gig.title || ''

      const location =
        gig.location || ''

      const budget =
        Number(gig.budget) || 0

      return (
        title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) &&
        location
          .toLowerCase()
          .includes(
            locationFilter.toLowerCase()
          ) &&
        (
          budgetFilter === '' ||
          budget >=
            Number(
              budgetFilter
            )
        )
      )
    })

  /* APPLY PROPOSAL */

  const applyProposal =
    async gig => {
      try {
        const freelancerId =
          localStorage.getItem(
            'userId'
          )

        /* CREATE PROPOSAL */

        await API.post(
          '/proposals',
          {
            gigId: gig._id,

            freelancerId,

            proposalText:
              'I can complete this project successfully.',

            bidAmount:
              gig.budget,

            duration:
              '7 Days'
          }
        )

        /* CREATE NOTIFICATION */

        await API.post(
          '/notifications',
          {
            userId:
              gig.createdBy,

            message: `New proposal received for ${gig.title}`
          }
        )

        alert(
          'Proposal Applied Successfully'
        )
      } catch (error) {
        console.log(error)

        alert(
          'Error Applying Proposal'
        )
      }
    }

  return (
    <div className='min-h-screen text-white'>
      {/* HERO SECTION */}

      <section className='text-center py-24 px-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 rounded-3xl shadow-2xl'>
        <h1 className='text-6xl font-extrabold'>
          SkillSphere
        </h1>

        <p className='text-xl mt-6 text-gray-100'>
          Intelligent Hyperlocal
          Freelance Ecosystem
        </p>

        <div className='mt-8 flex justify-center gap-5 flex-wrap'>
          <button
            onClick={() =>
              navigate(
                '/create-gig'
              )
            }
            className='bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300'
          >
            Post a Gig
          </button>

          <button
            onClick={() =>
              navigate(
                '/register'
              )
            }
            className='bg-black/30 backdrop-blur-md border border-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300'
          >
            Join Now
          </button>
        </div>
      </section>

      {/* SEARCH FILTERS */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-12'>
        <input
          type='text'
          value={search}
          placeholder='Search by title'
          onChange={e =>
            setSearch(
              e.target.value
            )
          }
          className='p-4 rounded-2xl bg-slate-800 border border-cyan-500 outline-none focus:ring-2 focus:ring-cyan-400'
        />

        <input
          type='text'
          value={locationFilter}
          placeholder='Filter by location'
          onChange={e =>
            setLocationFilter(
              e.target.value
            )
          }
          className='p-4 rounded-2xl bg-slate-800 border border-pink-500 outline-none focus:ring-2 focus:ring-pink-400'
        />

        <input
          type='number'
          value={budgetFilter}
          placeholder='Minimum budget'
          onChange={e =>
            setBudgetFilter(
              e.target.value
            )
          }
          className='p-4 rounded-2xl bg-slate-800 border border-green-500 outline-none focus:ring-2 focus:ring-green-400'
        />
      </div>

      {/* TITLE */}

      <div className='flex justify-between items-center mt-14 mb-8 flex-wrap gap-5'>
        <h1 className='text-5xl font-bold'>
          Latest Gigs
        </h1>

        <div className='bg-slate-800 px-5 py-3 rounded-xl border border-cyan-500'>
          Total Gigs:
          <span className='text-cyan-400 font-bold ml-2'>
            {
              filteredGigs.length
            }
          </span>
        </div>
      </div>

      {/* EMPTY MESSAGE */}

      {filteredGigs.length ===
        0 && (
        <div className='bg-slate-800 border border-red-500 p-10 rounded-2xl text-center shadow-xl'>
          <h2 className='text-3xl text-red-400 font-bold'>
            No gigs found
          </h2>

          <p className='mt-3 text-gray-300'>
            Try changing filters
          </p>
        </div>
      )}

      {/* GIG CARDS */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {filteredGigs.map(gig => (
          <div
            key={gig._id}
            className='bg-slate-800/80 backdrop-blur-lg border border-cyan-500 rounded-3xl p-7 shadow-2xl hover:scale-[1.02] transition-all duration-300'
          >
            {/* TOP */}

            <div className='flex justify-between items-center flex-wrap gap-4'>
              <h2 className='text-3xl font-bold text-cyan-300'>
                {gig.title}
              </h2>

              <span className='bg-green-500 px-5 py-2 rounded-xl font-bold text-white shadow-lg'>
                ₹ {gig.budget}
              </span>
            </div>

            {/* DESCRIPTION */}

            <p className='mt-5 text-gray-300 text-lg leading-8'>
              {gig.description}
            </p>

            {/* SKILLS */}

            <div className='mt-5 flex flex-wrap gap-3'>
              {gig.skillsRequired?.map(
                (
                  skill,
                  index
                ) => (
                  <span
                    key={index}
                    className='bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-4 py-2 rounded-full text-sm'
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            {/* LOCATION */}

            <div className='mt-6 flex justify-between items-center flex-wrap gap-4'>
              <p className='text-pink-300 font-semibold text-lg'>
                📍{' '}
                {
                  gig.location
                }
              </p>

              <div className='bg-yellow-500/20 border border-yellow-400 text-yellow-300 px-4 py-2 rounded-xl'>
                AI Match:
                <span className='font-bold ml-2'>
                  {Math.floor(
                    Math.random() *
                      20 +
                      80
                  )}
                  %
                </span>
              </div>
            </div>

            {/* BUTTONS */}

            <div className='flex flex-wrap gap-4 mt-8'>
              <button
                onClick={() =>
                  applyProposal(
                    gig
                  )
                }
                className='bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300'
              >
                Apply Proposal
              </button>

              <button
                className='bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300'
              >
                View Details
              </button>

              <button
                onClick={() =>
                  navigate(
                    '/payment'
                  )
                }
                className='bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300'
              >
                Pay Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home