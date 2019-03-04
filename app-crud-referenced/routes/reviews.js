const express = require("express");
const Router = express.Router();

const Book = require('../models/Book')

Router.post('/add', (req, res, next) => {
    const { user, comments } = req.body;
    Book.update({ _id: req.query.book_id }, { $push: { reviews: { user, comments }}})
    .then(book      => res.redirect('/books'))
    .catch(error    => console.log(error))
});

module.exports = Router;