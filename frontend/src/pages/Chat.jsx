import {
  useEffect,
  useState
} from 'react'

import io from 'socket.io-client'

const socket = io(
  'http://localhost:5000'
)

function Chat() {
  const [message, setMessage] =
    useState('')

  const [messages, setMessages] =
    useState([])

  useEffect(() => {
    socket.on(
      'receiveMessage',
      data => {
        setMessages(prev => [
          ...prev,
          data
        ])
      }
    )

    return () => {
      socket.off(
        'receiveMessage'
      )
    }
  }, [])

  const sendMessage = () => {
    if (!message) return

    socket.emit(
      'sendMessage',
      message
    )

    setMessage('')
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-4xl font-bold text-cyan-400 mb-5'>
        Real Time Chat
      </h1>

      <div className='bg-slate-800 h-[400px] overflow-y-auto p-5 rounded-xl border border-cyan-500'>
        {messages.map(
          (msg, index) => (
            <div
              key={index}
              className='bg-cyan-500 p-3 rounded mt-3'
            >
              {msg}
            </div>
          )
        )}
      </div>

      <div className='flex gap-3 mt-5'>
        <input
          className='flex-1 p-3 rounded bg-slate-700'
          value={message}
          onChange={e =>
            setMessage(
              e.target.value
            )
          }
        />

        <button
          className='bg-cyan-500 px-5 rounded'
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat