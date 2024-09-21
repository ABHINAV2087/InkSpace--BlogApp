const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 8000;

const authRoutes = require('./Routes/Auth');
const blogRoutes = require('./Routes/Blog');
const imageUploadRoutes = require('./Routes/imageUploadRoutes');

const allowedOrigins = ['http://localhost:5173', 'https://ink-space-blog-app.vercel.app']; // Add more origins if needed

// Configure CORS with credentials
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials to be sent
  })
);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // Parse cookies

// Define routes
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/image', imageUploadRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'the api is working' });
});

// Fetch blog categories route
app.get('/blogcategories', async (req, res) => {
  const blogCategories = [
    "Technology Trends", "Health and Wellness", "Travel Destinations", "Food and Cooking",
    "Personal Finance", "Career Development", "Parenting Tips", "Self-Improvement", "Home Decor and DIY",
    "Book Reviews", "Environmental Sustainability", "Fitness and Exercise",
    "Movie and TV Show Reviews", "Entrepreneurship", "Mental Health", "Fashion and Style",
    "Hobby and Crafts", "Pet Care", "Education and Learning", "Sports and Recreation"
  ];

  res.json({
    message: 'Categories fetched successfully',
    categories: blogCategories,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
