import React, { useState, useEffect } from 'react'
import { ArrowRightIcon, FileTextIcon, CalendarIcon } from 'lucide-react'
import { Link } from 'react-router'
import RateLimitUI from '../components/RateLimitUI'
import axios from 'axios'
import LoadingUI from '../components/LoadingUI.jsx'

const HomePage = () => {
const [isRateLimited, setIsRateLimited] = useState(false);
const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchNotes = async () => {
    setLoading(true);
    const response = await axios.get('http://localhost:3000/api/notes/getAllNotes');
    console.log(response.data.data);
    setNotes(response.data.data);
    setLoading(false);
  }
  fetchNotes().catch((error) => {
    console.error('Error fetching notes:', error);
    if (error.response?.status === 429) {
      setIsRateLimited(true);
    } else {
      setIsRateLimited(false);
      setLoading(false);
    }
  });
}, []);
  return (
    <div className='min-h-screen flex flex-col items-start pt-16 justify-start bg-gray-950'>
     <div className='container mx-auto justify-center items-center flex flex-col gap-6 '>
      <h1 className='text-9xl font-extrabold text-center max-w-[800px] bg-gradient-to-r from-white via-gray-100 to-blue-600 text-transparent bg-clip-text inline-block drop-shadow-[0_0_100px_rgba(59,130,246,0.6)]'>Welcome to the Note App</h1>
      <p className='text-center text-2xl text-gray-400'>This is a note app built with React and Tailwind CSS</p>
      <Link to='/create'>
      <button className='btn btn-secondary flex items-center gap-2 flex-row'>Get Started <ArrowRightIcon className='w-4 h-4' /></button>
      </Link>
     </div>
     {isRateLimited && <RateLimitUI onClose={() => setIsRateLimited(false)} />}
     {loading && <LoadingUI />}
     {notes.length > 0 && (
      <div className='w-full max-w-7xl mx-auto px-4 py-8 mt-12'>
        <h2 className='text-4xl font-bold text-center mb-8 text-white'>Your Notes</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note) => {
            const createdDate = new Date(note.createdAt);
            const formattedDate = createdDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });
            
            return (
              <Link 
                key={note._id} 
                to={`/note/${note._id}`}
                className='group'
              >
                <div className='bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-1 h-full flex flex-col'>
                  {/* Header with icon */}
                  <div className='flex items-start gap-3 mb-4'>
                    <div className='p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors'>
                      <FileTextIcon className='w-5 h-5 text-blue-400' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors'>
                        {note.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <p className='text-gray-400 text-sm mb-4 line-clamp-3 flex-1'>
                    {note.content}
                  </p>
                  
                  {/* Footer with date and arrow */}
                  <div className='flex items-center justify-between pt-4 border-t border-gray-700/50 mt-auto'>
                    <div className='flex items-center gap-2 text-gray-500 text-xs'>
                      <CalendarIcon className='w-4 h-4' />
                      <span>{formattedDate}</span>
                    </div>
                    <ArrowRightIcon className='w-4 h-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all' />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>    
      </div>)}
    </div>
  );
}

export default HomePage