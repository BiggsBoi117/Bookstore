import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';

function AdminBooksPage({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTitle] = useState<string>('');
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
  }, [pageSize, currentPage, searchTitle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin - Books</h1>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>{book.price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-2"
                  onClick={() => {
                    console.log(
                      'Edit button clicked for book ID:',
                      book.bookId
                    );
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100 mb-2"
                  onClick={() => {
                    console.log(
                      'Delete button clicked for book ID:',
                      book.bookId
                    );
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
}

export default AdminBooksPage;
