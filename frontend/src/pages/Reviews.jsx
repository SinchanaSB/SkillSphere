import {
  useEffect,
  useState
} from 'react'

import API from '../api/api'

function Reviews() {
  const [rating, setRating] =
    useState('')

  const [comment, setComment] =
    useState('')

  const [reviews, setReviews] =
    useState([])

  const freelancerId =
    localStorage.getItem(
      'userId'
    )

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews =
    async () => {
      try {
        const res =
          await API.get(
            `/reviews/${freelancerId}`
          )

        setReviews(res.data)
      } catch (error) {
        console.log(error)
      }
    }

  const submitReview =
    async () => {
      try {
        await API.post(
          '/reviews',
          {
            freelancerId,
            reviewerId:
              freelancerId,
            rating,
            comment
          }
        )

        alert(
          'Review Added'
        )

        fetchReviews()
      } catch (error) {
        console.log(error)
      }
    }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (acc, review) =>
              acc +
              review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='bg-slate-800 p-10 rounded-2xl border border-cyan-500 shadow-2xl'>
        <h1 className='text-5xl font-bold text-cyan-400 mb-5'>
          Reviews & Ratings
        </h1>

        <h2 className='text-2xl text-yellow-400 mb-8'>
          ⭐ Average Rating:
          {averageRating}
        </h2>

        <input
          type='number'
          placeholder='Rating (1-5)'
          className='w-full p-4 bg-slate-700 rounded-xl mb-5'
          onChange={e =>
            setRating(
              e.target.value
            )
          }
        />

        <textarea
          placeholder='Write review'
          className='w-full p-4 bg-slate-700 rounded-xl mb-5'
          onChange={e =>
            setComment(
              e.target.value
            )
          }
        />

        <button
          onClick={submitReview}
          className='bg-cyan-500 px-6 py-3 rounded-xl font-bold'
        >
          Submit Review
        </button>
      </div>

      <div className='mt-10'>
        {reviews.map(review => (
          <div
            key={review._id}
            className='bg-slate-800 p-5 rounded-xl border border-purple-500 mt-5'
          >
            <h2 className='text-yellow-400 text-xl font-bold'>
              ⭐ {review.rating}
            </h2>

            <p className='mt-3 text-gray-300'>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews