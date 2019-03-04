const express = require("express");
const Router = express.Router();

const Book = require('../models/Book')

// Listado de libros
Router.get("/", (req, res) => {
  Book.find()
  .then(books   => res.render("books", {books}) )
  .catch(err    => console.log('Error', err))
})


// Detalle de cada libro
Router.get("/details/:id", (req, res) => {

  const bookId = req.params.id;
  
  if (!/^[0-9a-fA-F]{24}$/.test(bookId)) { 
    return res.status(404).render('not-found');
  }

  Book.findById(bookId)
    .populate('author')
    .then(book  => {
      if (!book) {
        return res.status(404).render('not-found');
      }
      res.render("book-info", {book})
    })
})


// Randerizar formulario nuevo libro
Router.get('/add', (req, res) => res.render("book-add"))

// Registrar formulario nuevo libro
Router.post('/add', (req, res) => {

  const {title, author, text} = req.body
  const book = new Book({title, author, text})

  book.save()
    .then(thenewbook  => res.redirect('/books'))
    .catch(error      => console.log(`Error saving book: ${error}`))
})




// Randerizar edición de libro
Router.get('/edit', (req, res) => {

  Book.findOne({_id: req.query.book_id})
  .then(book    => res.render('book-edit', {book} ))
  .catch(error  => console.log(`Error finding book: ${error}`))
})

// Actualizar libro editado
Router.post('/edit', (req, res) => {
  const {title, author, text} = req.body
  Book.update({_id: req.query.book_id},  { $set: {title, author, text }})
  .then(book    => res.redirect('/books'))
  .catch(error  => console.log(`Error updating book: ${error}`))
})


module.exports = Router;