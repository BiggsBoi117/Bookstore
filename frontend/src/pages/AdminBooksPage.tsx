import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';
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
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

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

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book.bookId !== bookId));
    } catch (error) {
      alert('Failed to delete project. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin - Books</h1>

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onBookAdded={() => {
            setShowForm(false);
            fetchBooks(pageSize, currentPage, searchTitle, []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onBookAdded={() => {
            setEditingBook(null);
            fetchBooks(pageSize, currentPage, '', []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

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
                    setEditingBook(book);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100 mb-2"
                  onClick={() => {
                    handleDelete(book.bookId);
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
