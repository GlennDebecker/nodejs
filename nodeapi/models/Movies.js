const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
  titleMovie: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: false
  },
  movieRelease: {
    type: Number,
    required: false,
    validate: {
      validator: function(value) {
        const minYear = 1889;
        const currentYear = new Date().getFullYear();
        return value > minYear && value <= currentYear;
      },
      message: 'Movie release date must be between 1888 and the current year'
    }
  },
  recordCreatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Groep1', MoviesSchema);
