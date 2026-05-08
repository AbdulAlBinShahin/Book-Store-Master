import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'


const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const data = await response.data;
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='space-y-6'>
      <BackButton />
      <div className='card-surface p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Book details</h1>
            <p className='mt-1 text-sm text-slate-600'>Full information for this record.</p>
          </div>
          {loading ? <Spinner /> : null}
        </div>

        {!loading && (
          <div className='mt-6 grid gap-3 sm:grid-cols-2'>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Title</div>
              <div className='mt-1 text-base font-semibold text-slate-900'>{book.title}</div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Author</div>
              <div className='mt-1 text-base font-semibold text-slate-900'>{book.author}</div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Publish year</div>
              <div className='mt-1 text-base font-semibold text-slate-900'>{book.publishYear}</div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Book ID</div>
              <div className='mt-1 break-all font-mono text-sm text-slate-700'>{book._id}</div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2'>
              <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Description</div>
              <div className='mt-1 text-sm text-slate-700'>
                {book.description?.trim() ? book.description : 'No description added yet.'}
              </div>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2'>
              <div className='grid gap-3 sm:grid-cols-2'>
                <div>
                  <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Created</div>
                  <div className='mt-1 text-sm text-slate-700'>{new Date(book.createdAt).toString()}</div>
                </div>
                <div>
                  <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Last updated</div>
                  <div className='mt-1 text-sm text-slate-700'>{new Date(book.updatedAt).toString()}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowBook;
