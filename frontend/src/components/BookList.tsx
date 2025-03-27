import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          className="form-control"
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </label>
      <br />
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

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(
                  `/addconfirm/${book.title}/${book.bookId}/${book.price}`
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      <br />
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="btn btn-primary"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          disabled={currentPage === i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className="btn btn-primary"
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="btn btn-primary"
      >
        Next
      </button>

      <br />
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="form-select"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
      <br />
      <br />
      <div>
        <button className="btn btn-primary" onClick={scrollToTop}>
          Return to Top
        </button>
      </div>
    </>
  );
}

export default BookList;
