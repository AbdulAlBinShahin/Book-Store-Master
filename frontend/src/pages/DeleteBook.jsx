import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5555/books/${id}`);
      setLoading(false);
      enqueueSnackbar('Book Deleted Successfully', { variant: 'success'});
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', {variant: 'error'});
      console.log(error);
    }
  };

  return (
    <div className='space-y-6'>
      <BackButton/>
      <div className='card-surface p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Delete book</h1>
            <p className='mt-1 text-sm text-slate-600'>This action can’t be undone.</p>
          </div>
          {loading ? <Spinner /> : null}
        </div>

        <div className='mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-100'>
          <div className='text-sm font-semibold'>Are you sure?</div>
          <div className='mt-1 text-sm text-rose-200/90'>
            Deleting this book will permanently remove it from your collection.
          </div>
        </div>

        <div className='mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
          <button className='btn-secondary' onClick={() => window.history.back()} disabled={loading}>
            Cancel
          </button>
          <button className='btn-danger' onClick={handleDeleteBook} disabled={loading}>
            Yes, delete it
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook;
