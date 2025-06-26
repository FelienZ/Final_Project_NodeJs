**Final Project Backend Basic from Dicoding**

**BookShelf API**

Belajar Membuat API Daftar Buku dengan Node Js dan Hapi JS.

**Tools Used:**
 - Node.Js
 - Hapi.Js
 - Postman for HTTP Request Simulation


 ### ✅ Dokumentasi Endpoint

---

### `POST /books`

**Adding a new book**

```json
Body req:
{
  "name": "Buku A",
  "year": 2025,
  "author": "Author A",
  "summary": "Belajar Dasar Backend dengan NodeJs",
  "publisher": "Dicoding",
  "pageCount": 500,
  "readPage": 100,
  "reading": true
}
```
### `GET /books`

**Show All Entries of Books**

```json
Response:
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "Qbax5Oy7L8WKf74l",
        "name": "Buku A",
        "publisher": "Dicoding"
      }
    ]
  }
}
```

### `GET /books/{id}`

**Show Specified Book by Id if Exist**

```json
Response:
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "Qbax5Oy7L8WKf74l",
        "name": "Buku A",
        "...": "..."
      }
    ]
  }
}
```

### `PUT /books/{id}`

**Updating/ Editing Books Property with specified Id if Exist**

```json
Response:
{
  "status": "success",
  "message": "Buku berhasil diperbarui"
}
```
### `DELETE /books/{id}`

**Deleting Book with specified Id if Exist**

```json
Response:
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

**Notes** : Properti Id, InsertedAt, UpdatedAt, Finished diperoleh dari server.

