import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingUI = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-md'>
      <div className='bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4'>
        <div className='flex flex-col items-center justify-center space-y-6'>
          {/* Animated Spinner */}
          <div className='relative'>
            <Loader2 className='w-16 h-16 text-blue-400 animate-spin' />
            <div className='absolute inset-0 w-16 h-16 border-4 border-blue-500/20 rounded-full'></div>
            <div className='absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin'></div>
          </div>
          
          {/* Text Content */}
          <div className='text-center space-y-2'>
            <h2 className='text-2xl font-bold text-white'>Loading Notes</h2>
            <p className='text-gray-400 text-sm'>Please wait while we fetch your notes...</p>
          </div>
          
          {/* Loading Dots Animation */}
          <div className='flex space-x-2'>
            <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
            <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
            <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingUI