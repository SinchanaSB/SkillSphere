import {
  useState,
  useEffect
} from 'react'

import API from '../api/api'

function Proposals() {
  const [
    proposalText,
    setProposalText
  ] = useState('')

  const [
    bidAmount,
    setBidAmount
  ] = useState('')

  const [
    duration,
    setDuration
  ] = useState('')

  const [proposals, setProposals] =
    useState([])

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals =
    async () => {
      const res =
        await API.get(
          '/proposals'
        )

      setProposals(res.data)
    }

  const handleSubmit =
    async () => {
      await API.post(
        '/proposals',
        {
          proposalText,
          bidAmount,
          duration
        }
      )

      alert(
        'Proposal Submitted'
      )

      fetchProposals()
    }

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-5xl font-bold text-cyan-400 mb-10'>
        Proposals
      </h1>

      <textarea
        className='w-full p-4 bg-slate-800 rounded-xl mb-5'
        placeholder='Proposal'
        onChange={e =>
          setProposalText(
            e.target.value
          )
        }
      />

      <input
        className='w-full p-4 bg-slate-800 rounded-xl mb-5'
        placeholder='Bid Amount'
        onChange={e =>
          setBidAmount(
            e.target.value
          )
        }
      />

      <input
        className='w-full p-4 bg-slate-800 rounded-xl mb-5'
        placeholder='Duration'
        onChange={e =>
          setDuration(
            e.target.value
          )
        }
      />

      <button
        onClick={handleSubmit}
        className='bg-cyan-500 px-6 py-3 rounded-xl'
      >
        Submit Proposal
      </button>

      <div className='mt-10'>
        {proposals.map(
          proposal => (
            <div
              key={proposal._id}
              className='bg-slate-800 p-5 rounded-xl mt-5'
            >
              <p>
                {
                  proposal.proposalText
                }
              </p>

              <p className='text-green-400 mt-2'>
                ₹
                {
                  proposal.bidAmount
                }
              </p>

              <p className='text-pink-400'>
                {
                  proposal.duration
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Proposals