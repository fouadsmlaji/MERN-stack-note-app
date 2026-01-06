import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import './App.css'
import NavBar from './components/NavBar.JSX'
import './components/Buttons.css'

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-700/50 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-400 text-sm">
          Created by <span className="text-blue-400 font-medium">Fouad Smlaji</span>
        </p>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div data-theme="dim" className='min-h-screen flex flex-col'>
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App