import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5555/books');
        const data = await response.data;
        setBooks(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((b) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${b.title ?? ''} ${b.author ?? ''} ${b.publishYear ?? ''}`.toLowerCase().includes(q);
  });

  return (
    <div className='space-y-6'>
      <div className='card-surface p-5 sm:p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>Books</h1>
            <p className='mt-1 text-sm text-slate-600'>Browse, search, and manage your collection.</p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search title, author, year…'
              className='input sm:w-72'
            />
            <div className='flex rounded-xl bg-sky-50 p-1 ring-1 ring-sky-100'>
              <button
                className={showType === 'table' ? 'btn-primary px-3 py-2 text-sm' : 'btn-secondary px-3 py-2 text-sm'}
                onClick={() => setShowType('table')}
              >
                Table
              </button>
              <button
                className={showType === 'card' ? 'btn-primary px-3 py-2 text-sm' : 'btn-secondary px-3 py-2 text-sm'}
                onClick={() => setShowType('card')}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='card-surface p-3 sm:p-4'>
        {loading ? (
          <div className='flex items-center justify-center py-14'>
            <Spinner />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className='px-4 py-14 text-center'>
            <div className='text-lg font-semibold text-slate-900'>No books found</div>
            <div className='mt-1 text-sm text-slate-600'>
              Try a different search, or{' '}
              <Link className='text-sky-700 underline-offset-4 hover:underline' to='/books/create'>
                add a new book
              </Link>
              .
            </div>
          </div>
        ) : showType === 'table' ? (
          <BooksTable books={filteredBooks} />
        ) : (
          <BooksCard books={filteredBooks} />
        )}
      </div>
    </div>
  );
};

export default Home;
