const express = require('express');
const router = express.Router();
const Groep1 = require('../models/groep1');

// CRUD operations voor Movies hier

module.exports = router;
``
// Krijg all de records
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
      const records = await Groep1.find().limit(limit).skip(offset);
      res.json(records);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.q; // Krijg de search query parameter

  try {
      const records = await Groep1.find({
          titleMovie: { $regex: new RegExp(searchQuery, 'i') } // case-insensitive opzoeken
      });
      res.json(records);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


  // Maak een nieuwe record
  router.post('/', async (req, res) => {
    const newRecord = new Groep1({
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
      const updatedRecord = await Groep1.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete de record
  router.delete('/:id', async (req, res) => {
    try {
      await Groep1.findByIdAndDelete(req.params.id);
      res.json({ message: 'Record deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;