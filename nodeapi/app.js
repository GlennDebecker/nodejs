const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const mongoString = process.env.DATABASE

// Connectie naar de MongoDB
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to my API for Backend Web - Project node.js - Glenn Debecker');
});

// Routes
app.use('/api/groep1', require('./routes/groep1'));
app.use('/api/applyMail', require('./routes/applyMail'));

// Start de server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});