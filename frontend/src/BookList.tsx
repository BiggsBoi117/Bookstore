import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        'https://localhost:5000/api/Bookstore/AllBooks'
      );
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Book List</h1>
      <br />
      {books.map((book) => (
        <div>
          <h2>{book.title}</h2>
          <ul key={book.bookId}>
            <li>Author: {book.author}</li>
            <li>Publisher: {book.publisher}</li>
            <li>ISBN: {book.isbn}</li>
            <li>Classification: {book.classification}</li>
            <li>Category: {book.category}</li>
            <li>Page Count: {book.pageCount}</li>
            <li>Price: {book.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
