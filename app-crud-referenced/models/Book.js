const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  text: String,
  author: [ { type : Schema.Types.ObjectId, ref: 'Author' } ],
  reviews: [ 
    {
      user: String,
      comments: String
    } 
  ]
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;