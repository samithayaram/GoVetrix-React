import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

export default function ThankYou() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 py-12">
      <div className="bg-white text-black rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-20 w-20 text-green-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold mt-6">Thank You!</h1>
        <p className="mt-3 text-gray-600 text-base">
          Your message has been received. We’ll get back to you shortly.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-md"
        >
          Go Back Home
        </button>
      </div>
    </div>
  )
}

  