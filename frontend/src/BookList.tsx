import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTitle, setSearchTitle] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((category) => `categories=${encodeURIComponent(category)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Bookstore/AllBooks?pageSize=${pageSize}&currentPage=${currentPage}&title=${searchTitle}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalCount(data.totalCount);
      setTotalPages(Math.ceil(totalCount / pageSize));
    };

    fetchBooks();
  }, [pageSize, currentPage, totalCount, searchTitle, selectedCategories]);

  return (
    <>
      <label>
        Search by Title:
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </label>
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

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          disabled={currentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
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
