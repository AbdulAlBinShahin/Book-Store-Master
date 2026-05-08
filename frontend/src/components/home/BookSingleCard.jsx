import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import BookModal from './BookModal'



const BookSingleCard = ({ book }) => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div
    key={book._id}
    className='group card-surface relative overflow-hidden p-4 transition hover:bg-slate-50'
   >
      <div className='flex items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <div className='grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sky-50 ring-1 ring-sky-100'>
            <PiBookOpenTextLight className='text-xl text-sky-300' />
          </div>
          <div className='min-w-0'>
            <h2 className='truncate text-base font-bold text-slate-900'>{book.title}</h2>
            <div className='mt-1 flex items-center gap-2 text-sm text-slate-600'>
              <BiUserCircle className='text-lg text-slate-500' />
              <span className='truncate'>{book.author}</span>
            </div>
          </div>
        </div>

        <div className='rounded-xl bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-200 ring-1 ring-rose-500/20'>
          {book.publishYear}
        </div>
      </div>

      <div className='mt-3 text-xs text-slate-600'>
        <span className='font-mono'>{book._id}</span>
      </div>

      <div className='mt-4 flex flex-wrap items-center justify-end gap-2'>
        <BiShow
          className='flex-shrink-0 cursor-pointer text-2xl text-sky-300 transition hover:text-sky-200'
          onClick={() => setShowModal(true)}
          />
          <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className='flex-shrink-0 text-2xl text-emerald-300 transition hover:text-emerald-200'/>
          </Link>
          <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className='flex-shrink-0 text-2xl text-amber-300 transition hover:text-amber-200'/>
          </Link>
          <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className='flex-shrink-0 text-2xl text-rose-300 transition hover:text-rose-200'/>
          </Link>
      </div>
      {
        showModal && (
            <BookModal book={book} onClose={() => setShowModal(false)} />
        )
      }
   </div>
  )
}

export default BookSingleCard