const express = require('express');
const cors = require('cors');
const { logErrorMiddleware } = require('../../logging-middleware/logMiddleware');
const urlShortenerController = require('./controllers/urlShortenerController');

const app = express();

app.use(cors({ origin: 'http://localhost:3001' })); 
app.use(express.json());

// Routes
app.post('/shorturls', urlShortenerController.createShortUrl);
app.get('/shorturls/:shortcode', urlShortenerController.getStats);

// Error logging middleware
app.use(logErrorMiddleware);

module.exports = app;
