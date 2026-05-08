import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    const data = {
      title,
      author,
      publishYear,
      description,
    };
    setLoading(true);
    try {
      await axios.post('http://localhost:5555/books', data);
      setLoading(false);
      enqueueSnackbar('Book Created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      setLoading(false);
      // alert('An error happened. Pls check console');
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className='space-y-6'>
      <BackButton />
      <div className='card-surface p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Create book</h1>
            <p className='mt-1 text-sm text-slate-600'>Add a new title to your collection.</p>
          </div>
          {loading ? <Spinner /> : null}
        </div>

        <div className='mt-6 grid gap-5 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <label className='label'>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g. Clean Code'
              className='input'
            />
          </div>

          <div>
            <label className='label'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder='e.g. Robert C. Martin'
              className='input'
            />
          </div>

          <div>
            <label className='label'>Publish year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              placeholder='e.g. 2008'
              className='input'
            />
          </div>

          <div className='sm:col-span-2'>
            <label className='label'>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Short summary for the eye preview'
              className='input min-h-28 resize-y'
            />
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-2'>
          <button className='btn-secondary' onClick={() => window.history.back()}>
            Cancel
          </button>
          <button className='btn-primary' onClick={handleSaveBook} disabled={loading}>
            Save book
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
