import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className='app-shell'>
      <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur'>
        <div className='app-container flex items-center justify-between py-4'>
          <Link to='/' className='group flex items-center gap-3'>
            <div className='grid h-10 w-10 place-items-center rounded-2xl bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 transition group-hover:bg-sky-400'>
              <span className='text-lg font-black'>B</span>
            </div>
            <div className='leading-tight'>
              <div className='text-base font-bold text-slate-900'>Book Store</div>
              <div className='text-xs text-slate-600'>MERN CRUD</div>
            </div>
          </Link>

          {isHome ? (
            <Link to='/books/create' className='btn-primary'>
              <MdOutlineAddBox className='text-xl' />
              Add book
            </Link>
          ) : (
            <Link to='/' className='btn-secondary'>
              Back to list
            </Link>
          )}
        </div>
      </header>

      <main className='app-container py-8'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/books/create' element={<CreateBook />}></Route>
          <Route path='/books/details/:id' element={<ShowBook />}></Route>
          <Route path='/books/edit/:id' element={<EditBook />}></Route>
          <Route path='/books/delete/:id' element={<DeleteBook />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App