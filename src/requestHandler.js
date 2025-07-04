const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) =>{
  const id = nanoid(16);
  const { name, year, author, summary,
    publisher, pageCount, readPage, reading } = request.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished = false;
  if (readPage === pageCount){
    finished = true;
  }
  const newBook = {
    id, name, year, author, summary, publisher, pageCount,
    readPage, finished, reading, insertedAt, updatedAt
  };

  if (!name){
    const response = h.response({
      'status': 'fail',
      'message': 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount){
    const response = h.response({
      'status': 'fail',
      'message': 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess){
    const response = h.response({
      status: 'success',
      message : 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      }
    });
    response.code(201);
    return response;
  }
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let bookSelected = books;
  if (name !== undefined){
    bookSelected = bookSelected.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  };
  if (reading !== undefined){
    bookSelected = bookSelected.filter((book) => book.reading === (reading === '1'));
  };
  if (finished !== undefined){
    bookSelected = bookSelected.filter((book) => book.finished === (finished === '1'));
  };
  const response = h.response({
    status: 'success',
    data: {
      books: bookSelected.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher
      }))
    }
  });
  response.code(200);
  return response;
};

const getBooksById = (request, h) =>{
  const { id } = request.params;
  const book = books.filter((buku) => buku.id === id)[0];
  if (book !== undefined){
    const response = h.response({
      status: 'success',
      data: {
        book,
      }
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    'status': 'fail',
    'message': 'Buku tidak ditemukan'
  });
  response.code(404);
  return response;
};

const updateBookById =(request, h) =>{
  const { id } = request.params;
  const { name, year, author, summary,
    publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((buku) => buku.id === id);
  if (index === -1){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  if (!name){
    const response = h.response({
      'status': 'fail',
      'message': 'Gagal memperbarui buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount){
    const response = h.response({
      'status': 'fail',
      'message': 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  books[index] = {
    ...books[index],
    name, year, author, summary,
    publisher, pageCount,
    readPage, reading, updatedAt
  };
  const response = h.response({
    'status': 'success',
    'message': 'Buku berhasil diperbarui'
  });
  response.code(200);
  return response;
};

const deleteBookById = (request, h) =>{
  const { id } = request.params;
  const index = books.findIndex((buku) => buku.id === id);

  if (index !== -1){
    books.splice(index, 1);
    const response = h.response({
      'status': 'success',
      'message': 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    'status': 'fail',
    'message': 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};
module.exports = { addBooks, getAllBooks, getBooksById, updateBookById, deleteBookById };