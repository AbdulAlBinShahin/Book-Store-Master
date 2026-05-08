import React from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200'>
      <table className='w-full'>
        <thead className='bg-slate-50'>
          <tr className='text-left text-xs font-semibold uppercase tracking-wide text-slate-600'>
            <th className='w-14 px-4 py-3'>#</th>
            <th className='px-4 py-3'>Title</th>
            <th className='hidden px-4 py-3 md:table-cell'>Author</th>
            <th className='hidden px-4 py-3 md:table-cell'>Year</th>
            <th className='px-4 py-3 text-right'>Actions</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-200'>
          {books.map((book, index) => (
            <tr key={book._id} className='hover:bg-slate-50'>
              <td className='px-4 py-3 text-sm text-slate-600'>{index + 1}</td>
              <td className='px-4 py-3'>
                <div className='font-semibold text-slate-900'>{book.title}</div>
                <div className='mt-0.5 text-xs text-slate-600 md:hidden'>
                  {book.author} • {book.publishYear}
                </div>
              </td>
              <td className='hidden px-4 py-3 text-sm text-slate-700 md:table-cell'>{book.author}</td>
              <td className='hidden px-4 py-3 text-sm text-slate-700 md:table-cell'>{book.publishYear}</td>
              <td className='px-4 py-3'>
                <div className='flex justify-end gap-2'>
                  <Link
                    to={`/books/details/${book._id}`}
                    className='btn-secondary px-3 py-2'
                    title='Details'
                  >
                    <BsInfoCircle className='text-lg text-emerald-300' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className='btn-secondary px-3 py-2' title='Edit'>
                    <AiOutlineEdit className='text-lg text-amber-300' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className='btn-secondary px-3 py-2' title='Delete'>
                    <MdOutlineDelete className='text-lg text-rose-300' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BooksTable