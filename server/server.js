require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

// Security Middleware
app.use(helmet());

app.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);


app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));


app.use('/api/mail', require('./routes/mailRoutes'));


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});


module.exports = app;