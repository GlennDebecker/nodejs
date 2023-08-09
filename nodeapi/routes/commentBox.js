const express = require('express');
const router = express.Router();
const CommentBox = require('../models/commentBox');

// Krijg al de records
router.get('/', async (req, res) => {
    try {
      const records = await CommentBox.find();
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Maak een nieuwe record
  router.post('/', async (req, res) => {
    const newRecord = new CommentBox({
      userName: req.body.userName,
      textBox: req.body.textBox,
      email: req.body.email,
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
      const updatedRecord = await CommentBox.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedRecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete een record
  router.delete('/:id', async (req, res) => {
    try {
      await CommentBox.findByIdAndDelete(req.params.id);
      res.json({ message: 'Record deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;