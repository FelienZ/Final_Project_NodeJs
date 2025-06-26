const { addBooks, getAllBooks, getBooksById, updateBookById, deleteBookById } = require('./requestHandler');

const routes = ([
  {
    method: 'POST',
    path: '/books',
    handler: addBooks
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksById
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookById
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById
  },

]);

module.exports = routes;