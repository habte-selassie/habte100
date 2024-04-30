const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const substitutionRoutes = require('./routes/substitutionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const socialRoutes = require('./routes/socialRoutes');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(authMiddleware); // Custom middleware for authentication

// Routes
// Example route for testing
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// User routes
app.use('/api/users', userRoutes);

// Recipe routes
app.use('/api/recipes', recipeRoutes);

// Substitution routes
app.use('/api/substitutions', substitutionRoutes);

// Category routes
app.use('/api/categories', categoryRoutes);

// Rating routes
app.use('/api/rating', ratingRoutes);

// Recommendation routes
app.use('/api/recommendation', recommendationRoutes);

// Nutrition routes
app.use('/api/nutrition', nutritionRoutes);

// Social routes
app.use('/api/social', socialRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Static File Serving
app.use(express.static('public'));

// Graceful Shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

// Environment Configuration
const environment = process.env.NODE_ENV || 'development';
const config = require(`./config/config.${environment}`);

// Start server
const PORT = config.server.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
