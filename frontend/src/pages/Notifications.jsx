import {
  useEffect,
  useState
} from 'react'

import API from '../api/api'

function Notifications() {
  const [
    notifications,
    setNotifications
  ] = useState([])

  const userId =
    localStorage.getItem(
      'userId'
    )

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications =
    async () => {
      try {
        const res =
          await API.get(
            `/notifications/${userId}`
          )

        setNotifications(
          res.data
        )
      } catch (error) {
        console.log(error)
      }
    }

  const markRead =
    async id => {
      try {
        await API.put(
          `/notifications/read/${id}`
        )

        fetchNotifications()
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='bg-slate-800 p-10 rounded-2xl border border-cyan-500 shadow-2xl'>
        <h1 className='text-5xl font-bold text-cyan-400 mb-10'>
          Notifications
        </h1>

        {notifications.length ===
        0 ? (
          <p className='text-gray-300'>
            No Notifications
          </p>
        ) : (
          notifications.map(
            notification => (
              <div
                key={
                  notification._id
                }
                className={`p-5 rounded-xl mb-5 border ${
                  notification.read
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-cyan-900 border-cyan-500'
                }`}
              >
                <p className='text-lg'>
                  {
                    notification.message
                  }
                </p>

                <p className='text-sm text-gray-400 mt-2'>
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>

                {!notification.read && (
                  <button
                    onClick={() =>
                      markRead(
                        notification._id
                      )
                    }
                    className='bg-cyan-500 px-4 py-2 rounded-lg mt-4 font-bold'
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}

export default Notifications