let express = require('express');
let router = express.Router();
let NewBook = require('../models/NewBook');
let Book = require('../models/Books');
let Comment = require('../models/Comments');

// List all books
router.get('/', (req, res, next) => {
  console.log("hey")
  NewBook.find({}, (err, books) => {
    if (err) return next(err);
    res.status(200).json({ books });
  });
});

// Get Single Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  NewBook.findById(id, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

// Ceate a book
router.post('/', (req, res, next) => {
  var data = req.body;
  data.tags = data.tags.trim().split(',');
  NewBook.create(data, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

//   Edit a book
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var data = req.body;
  data.tags = data.tags.trim().split(',');
  NewBook.findByIdAndUpdate(id, data, (err, book) => {
    if (err) return next(err);
    res.status(200).json({ book });
  });
});

//   Delete a book
router.delete('/:id', (req, res, next) => {
  var id = req.params.id;
  NewBook.findByIdAndDelete(id, (err, book) => {
    if (err) return next(err);
    Comment.deleteMany({ bookId: id }, (err, comments) => {
      if (err) return next(err);
     res.status(200).json({ book });
    });
    res.status(200).json({ book });
  });
});

// Add Comment
router.post('/newComment/:id', (req, res, next) => {
  var bookId = req.params.id;
  req.body.bookId = bookId;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    NewBook.findByIdAndUpdate(
      bookId,
      { $push: { comments: comment._id } },
      (err, book) => {
        if (err) return next(err);
        res.status(200).json({ book });
      }
    );
  });
});

// Edit Comment
router.put('/newComment/:id', (req, res, next) => {
  var commentId = req.params.id;
  var data = req.body;
  Comment.findByIdAndUpdate(commentId, data, (err, comment) => {
    if (err) return next(err);
    res.status(200).json({ comment });
  });
});

// Delete Comment
router.delete('/newComment/:id', (req, res, next) => {
  var commentId = req.params.id;
  Comment.findByIdAndDelete(commentId, (err, comment) => {
    if (err) return next(err);
    NewBook.findByIdAndUpdate(
      comment.bookId,
      { $pull: { comments: comment._id } },
      (err, book) => {
        if (err) return next(err);
        res.status(200).json({ book });
      }
    );
  });
});

module.exports = router;