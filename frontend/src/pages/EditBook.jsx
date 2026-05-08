import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const d = await response.data;
        setAuthor(d.author);
        setPublishYear(d.publishYear);
        setTitle(d.title);
        setDescription(d.description || '');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert('An error happened. Pls check console');
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear,
      description,
    };
    setLoading(true);
    try {
      await axios.put(`http://localhost:5555/books/${id}`, data);
      setLoading(false);
      enqueueSnackbar('Book Edited Successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <BackButton />
      <div className="card-surface p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Edit book</h1>
            <p className="mt-1 text-sm text-slate-600">Update the details and save.</p>
          </div>
          {loading ? <Spinner /> : null}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Publish year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="input"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input min-h-28 resize-y"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button className="btn-secondary" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleEditBook} disabled={loading}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
