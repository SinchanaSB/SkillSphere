import {
  useEffect,
  useState
} from 'react'

import API from '../api/api'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function Admin() {
  const [analytics, setAnalytics] =
    useState({
      totalUsers: 0,
      totalGigs: 0,
      totalProposals: 0,
      totalReviews: 0
    })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics =
    async () => {
      try {
        const res =
          await API.get(
            '/admin/analytics'
          )

        setAnalytics(res.data)
      } catch (error) {
        console.log(error)
      }
    }

  const data = [
    {
      name: 'Users',
      value:
        analytics.totalUsers
    },

    {
      name: 'Gigs',
      value:
        analytics.totalGigs
    },

    {
      name: 'Proposals',
      value:
        analytics.totalProposals
    },

    {
      name: 'Reviews',
      value:
        analytics.totalReviews
    }
  ]

  return (
    <div>
      <h1 className='text-5xl font-bold text-cyan-400 mb-10'>
        Admin Dashboard
      </h1>

      {/* CARDS */}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        <div className='bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg'>
          <h2 className='text-4xl font-bold'>
            {
              analytics.totalUsers
            }
          </h2>

          <p className='mt-2'>
            Total Users
          </p>
        </div>

        <div className='bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl shadow-lg'>
          <h2 className='text-4xl font-bold'>
            {
              analytics.totalGigs
            }
          </h2>

          <p className='mt-2'>
            Total Gigs
          </p>
        </div>

        <div className='bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl shadow-lg'>
          <h2 className='text-4xl font-bold'>
            {
              analytics.totalProposals
            }
          </h2>

          <p className='mt-2'>
            Total Proposals
          </p>
        </div>

        <div className='bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-xl shadow-lg'>
          <h2 className='text-4xl font-bold'>
            {
              analytics.totalReviews
            }
          </h2>

          <p className='mt-2'>
            Total Reviews
          </p>
        </div>
      </div>

      {/* CHART */}

      <div className='bg-slate-800 p-10 rounded-2xl mt-10'>
        <h2 className='text-3xl font-bold text-cyan-300 mb-8'>
          Platform Analytics
        </h2>

        <ResponsiveContainer
          width='100%'
          height={400}
        >
          <BarChart data={data}>
            <XAxis dataKey='name' />

            <YAxis />

            <Tooltip />

            <Bar dataKey='value' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Admin