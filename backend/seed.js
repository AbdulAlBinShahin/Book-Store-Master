import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

dotenv.config();

const mongoDBURL = process.env.mongoDBURL;

if (!mongoDBURL) {
  console.error('Missing mongoDBURL in .env');
  process.exit(1);
}

const sampleBooks = [
  { title: 'Clean Code', author: 'Robert C. Martin', publishYear: 2008 },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', publishYear: 1999 },
  { title: 'Design Patterns', author: 'Erich Gamma', publishYear: 1994 },
  { title: 'You Don’t Know JS Yet', author: 'Kyle Simpson', publishYear: 2020 },
  { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', publishYear: 2018 },
  { title: 'Refactoring', author: 'Martin Fowler', publishYear: 2018 },
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', publishYear: 2009 },
  { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', publishYear: 2008 },
  { title: 'Effective TypeScript', author: 'Dan Vanderkam', publishYear: 2019 },
  { title: 'MongoDB: The Definitive Guide', author: 'Kristina Chodorow', publishYear: 2013 },
];

async function main() {
  await mongoose.connect(mongoDBURL);
  const result = await Book.insertMany(sampleBooks);
  console.log(`Inserted ${result.length} books.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});

