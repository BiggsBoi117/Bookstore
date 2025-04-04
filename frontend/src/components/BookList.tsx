import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const response = await fetchBooks(
          pageSize,
          currentPage,
          searchTitle,
          selectedCategories
        );

        setBooks(response.books);
        setTotalPages(Math.ceil(response.totalCount / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, currentPage, searchTitle, selectedCategories]);

  if (loading) {
    return <p>Loading Books...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
      />
    </>
  );
}

export default BookList;
