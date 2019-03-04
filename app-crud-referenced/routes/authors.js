const express = require("express");
const Router = express.Router();

const Author = require('../models/Author')

// Randerizar formulario autores
Router.get('/add', (req, res) => res.render('author-add'))

// Guardar el nuevo autor en BBDD
Router.post('/add', (req, res) => {
    const { name, lastName, nationality, birthday, pictureUrl } = req.body;
    const newAuthor = new Author({ name, lastName, nationality, birthday, pictureUrl})
    newAuthor.save()
        .then(book     => res.redirect('/books'))
        .catch(error   => console.log(`Error saving author: ${error}`))
  });

module.exports = Router;