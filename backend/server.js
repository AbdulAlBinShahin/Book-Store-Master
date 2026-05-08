import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';
import { Book } from './models/bookModel.js';

dotenv.config();

const app = express();
const mongoDBURL = process.env.mongoDBURL;
const PORT = Number(process.env.PORT) || 5555;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Book Store API server is running',
  });
});

app.get('/books', async (_req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post('/books', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      description: req.body.description ?? '',
    };

    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    const server = app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        const fallbackPort = PORT + 1;
        app.listen(fallbackPort, () => {
          console.log(`Port ${PORT} busy, app is listening to port: ${fallbackPort}`);
        });
        return;
      }
      console.log(error);
    });
  })
  .catch((error) => {
    console.log(error);
  });
