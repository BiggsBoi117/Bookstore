import './App.css';
import AddConfirmPage from './pages/AddConfirmPage';
import BookstorePage from './pages/BookstorePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';
function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookstorePage />} />
            <Route path="/bookstore" element={<BookstorePage />} />
            <Route
              path="/addconfirm/:title/:bookId/:price"
              element={<AddConfirmPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/adminBooks"
              element={<AdminBooksPage selectedCategories={[]} />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
