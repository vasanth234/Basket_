
/*the below code is for adding login and register only ----->
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
});*/


import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import auth from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:4209',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Profile picture directory
const profileDir = path.join(__dirname, 'profile_pictures');
if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profileDir),
  filename: (req, file, cb) => {
    const userId = req.body.userId || 'anonymous';
    cb(null, `${userId}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// Profile picture upload endpoint
app.post('/api/upload-profile', upload.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid file type' });
  }
  res.status(200).json({ 
    profileImageUrl: `http://localhost:8709/profile_pictures/${req.file.filename}` 
  });
});

// Serve profile pictures
app.use('/profile_pictures', express.static(profileDir));

// Error handling for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});

// Define API routes
app.use("/api/auth", auth);

// Start the server
app.listen(8709, () => {
  console.log("Server is running on port 8709 and db connected");
});

