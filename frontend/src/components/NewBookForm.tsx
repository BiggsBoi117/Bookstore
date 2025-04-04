import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onBookAdded: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onBookAdded, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addBook(formData);
    onBookAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <br />
      <label>Author:</label>
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        placeholder="Author"
      />
      <br />
      <label>Publisher:</label>
      <input
        type="text"
        name="publisher"
        value={formData.publisher}
        onChange={handleInputChange}
        placeholder="Publisher"
      />
      <br />
      <label>ISBN:</label>
      <input
        type="text"
        name="isbn"
        value={formData.isbn}
        onChange={handleInputChange}
        placeholder="ISBN"
      />
      <br />
      <label>Classification:</label>
      <input
        type="text"
        name="classification"
        value={formData.classification}
        onChange={handleInputChange}
        placeholder="Classification"
      />
      <br />
      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        placeholder="Category"
      />
      <br />
      <label>Page Count:</label>
      <input
        type="number"
        name="pageCount"
        value={formData.pageCount}
        onChange={handleInputChange}
        placeholder="Page Count"
      />
      <br />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price"
      />
      <br />
      <button type="submit">Add Book</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NewBookForm;
