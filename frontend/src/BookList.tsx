import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Bookstore/AllBooks?pageSize=${pageSize}`
      );
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, [pageSize]);

  return (
    <>
      <h1>Book List</h1>
      <br />
      {books.map((book) => (
        <div id="bookCard" className="card" key={book.bookId}>
          <h2 className="card-title">{book.title}</h2>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {book.author}{' '}
              </li>
              <li>
                <strong>Publisher:</strong> {book.publisher}{' '}
              </li>
              <li>
                <strong>ISBN:</strong> {book.isbn}{' '}
              </li>
              <li>
                <strong>Classification:</strong> {book.classification}{' '}
              </li>
              <li>
                <strong>Category:</strong> {book.category}{' '}
              </li>
              <li>
                <strong>Page Count:</strong> {book.pageCount}{' '}
              </li>
              <li>
                <strong>Price:</strong> {book.price}{' '}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
