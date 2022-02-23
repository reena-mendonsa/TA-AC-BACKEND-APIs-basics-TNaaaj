var express = require('express');
var router = express.Router();
var Book = require('../models/Books');

// List all books
router.get('/', (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.status(200).json({ books });
  });
});

// Get Single Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

// Ceate a book
router.post('/', (req, res, next) => {
  var data = req.body;
  data.tags = data.tags.trim().split(',');
  Book.create(data, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

//   Edit a book
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var data = req.body;
  data.tags = data.tags.trim().split(',');
  Book.findByIdAndUpdate(id, data, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

//   Delete a book
router.delete('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) return next(err);
    
    res.status(200).json({ book });
  });
});

module.exports = router;