import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import dotenv from 'dotenv'
import path from 'path';
import cors from "cors";
dotenv.config();
const PORT = Number(process.env.PORT) || 5555;
const mongoDBURL = process.env.mongoDBURL;

const __dirname = path.resolve();

const app = express();

// middlewares
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.get('/', (request, response) => {
  return response.status(234).send('Welcome To BookStrore MERN Stack Project');
});

app.get('/echo', async (_request, response) => {
  try {
    const echoResponse = await fetch('https://postman-echo.com/get');
    const data = await echoResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});



// routes


// Middleware for parsing request body
app.use('/books', booksRoute);
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})


// Middleware for handling CORS Policy
// Option 1 : Allow All Origins with Default of cors(*)

// Option 2 : Allow Custom Origins
// app.use(
    //      cors({
        //         origin: 'http://localhost:5173',
        //         methods: ['GET','POST','PUT','DELETE'],
        //         allowedHeaders: ['Content-Type'],
        //      })
        // );
        
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.log(`Port ${port} is already in use, trying ${nextPort}...`);
      startServer(nextPort);
      return;
    }
    console.log(error);
  });
};

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    startServer(PORT);
  })
  .catch((error) => {
    console.log(error);
  });

