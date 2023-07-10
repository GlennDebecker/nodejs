const express = require('express');
const router = express.Router();
const Groep2 = require('../models/applyMail');

// Krijg al de records
router.get('/', async (req, res) => {
    try {
      const records = await Groep2.find();
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Maak een nieuwe record
  router.post('/', async (req, res) => {
    const newRecord = new Groep2({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
      country: req.body.country,
      gender: req.body.gender
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
      const updatedRecord = await Groep2.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete een record
  router.delete('/:id', async (req, res) => {
    try {
      await Groep2.findByIdAndDelete(req.params.id);
      res.json({ message: 'Record deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;