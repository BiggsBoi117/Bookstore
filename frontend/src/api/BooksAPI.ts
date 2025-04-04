import { Book } from '../types/Book';

interface FetchBookResponse {
  books: Book[];
  totalCount: number;
}

const baseUrl =
  'https://bookstore-backend-esb49-c8gph8a5bkesg3ah.eastus-01.azurewebsites.net/api/Bookstore';

export const fetchBooks = async (
  pageSize: number,
  currentPage: number,
  searchTitle: string,
  selectedCategories: string[]
): Promise<FetchBookResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((category) => `categories=${encodeURIComponent(category)}`)
      .join('&');

    const response = await fetch(
      `${baseUrl}/AllBooks?pageSize=${pageSize}&currentPage=${currentPage}&title=${searchTitle}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (book: Book): Promise<Book> => {
  try {
    const response = await fetch(`${baseUrl}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${baseUrl}/UpdateBook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/DeleteBook/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to add book');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
