import { Book } from '../types/Book';

interface FetchBookResponse {
  books: Book[];
  totalCount: number;
}

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
      `https://localhost:5000/api/Bookstore/AllBooks?pageSize=${pageSize}&currentPage=${currentPage}&title=${searchTitle}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`
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
