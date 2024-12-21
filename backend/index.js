import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './routes/auth.js'


const app = express();

// Use cookieParser as a middleware (invoke the function)
app.use(cookieParser());  // Ensure it's invoked


  
app.use(cors({
  origin: 'http://localhost:4209', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials (cookies, headers)
}));

// Parse incoming JSON requests
app.use(express.json());









// Define your API routes
app.use("/api/auth", auth);


// Start the server on port 8801
app.listen(8709, () => {
    console.log("Server is running on port 8709 and db connected");
});
