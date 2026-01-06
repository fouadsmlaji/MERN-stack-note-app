import React from 'react'
import { AlertTriangle, Clock, X } from 'lucide-react'

const RateLimitUI = ({ onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-md p-4'>
      <div className='bg-gray-800/90 backdrop-blur-sm border border-red-500/50 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative animate-in fade-in zoom-in duration-300'>
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-400 hover:text-white transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        )}
        
        <div className='flex flex-col items-center justify-center space-y-6'>
          {/* Icon with Animation */}
          <div className='relative'>
            <div className='absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse'></div>
            <div className='relative bg-red-500/10 p-4 rounded-full border-2 border-red-500/50'>
              <AlertTriangle className='w-12 h-12 text-red-400' />
            </div>
          </div>
          
          {/* Text Content */}
          <div className='text-center space-y-3'>
            <h2 className='text-2xl font-bold text-white'>Too Many Requests</h2>
            <p className='text-gray-400 text-sm leading-relaxed'>
              You've exceeded the rate limit. Please wait a moment before making another request.
            </p>
          </div>
          
          {/* Timer/Info Section */}
          <div className='flex items-center gap-2 text-gray-400 text-sm bg-gray-700/50 px-4 py-2 rounded-lg'>
            <Clock className='w-4 h-4 text-blue-400' />
            <span>Please try again in a few seconds</span>
          </div>
          
          {/* Action Button */}
          {onClose && (
            <button
              onClick={onClose}
              className='btn btn-primary w-full mt-4'
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RateLimitUI