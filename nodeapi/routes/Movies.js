const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');

// CRUD operations voor Movies hier

module.exports = router;
``
// Krijg all de records
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const sortOption = req.query.sort;

  let sortCriteria = {};

  if (sortOption === 'alphabeticalAsc') {
    sortCriteria = { titleMovie: 1 };
  } else if (sortOption === 'alphabeticalDesc') {
    sortCriteria = { titleMovie: -1 };
  } else if (sortOption === 'release') {
    sortCriteria = { movieRelease: 1 };
  }

  try {
    const records = await Movies.find().limit(limit).skip(offset).sort(sortCriteria);
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.q; // Krijg de search query parameter

  try {
      const records = await Movies.find({
          titleMovie: { $regex: new RegExp(searchQuery, 'i') } // case-insensitive opzoeken
      });
      res.json(records);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});







  // Maak een nieuwe record
  router.post('/', async (req, res) => {
    const newRecord = new Movies({
      titleMovie: req.body.title,
      description: req.body.description,
      director: req.body.director,
      movieRelease: req.body.movieRelease
    });
  
    try {
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update een bestaande record
  router.put('/:id', async (req, res) => {
    try {
        const updatedRecord = await Movies.findByIdAndUpdate(req.params.id, {
            titleMovie: req.body.title,
            description: req.body.description,
            director: req.body.director,
            movieRelease: req.body.movieRelease
        }, { new: true });
        res.json(updatedRecord);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });
  
  // Delete de record
  router.delete('/:id', async (req, res) => {
    try {
      await Movies.findByIdAndDelete(req.params.id);
      res.json({ message: 'Record deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;