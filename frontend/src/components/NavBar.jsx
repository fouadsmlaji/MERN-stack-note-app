import React from 'react'
import { Link } from 'react-router'
const NavBar = () => {
  return (
    <header className='bg-gray-950'>
        <div className='container mx-auto '>
            <nav className='flex justify-between items-center py-6'>
                <Link to='/' className='text-2xl font-medium text-white'>Note App</Link>
                <ul className='flex gap-4'>
                    <li><Link to='/' className='text-gray-300'>Home</Link></li>
                    <li><Link to='/create' className='text-gray-300'>Create</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default NavBar