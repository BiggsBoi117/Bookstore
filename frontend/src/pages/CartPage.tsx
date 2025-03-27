import { useNavigate } from 'react-router-dom';
import WelcomeHeader from '../components/WelcomeHeader';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import './CartPage.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <>
      <WelcomeHeader />
      <div className="container">
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item: CartItem) => (
                <li key={item.bookId} className="list-group-item">
                  {item.title} - ${item.price} x {item.quantity}
                  {'  '}
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.bookId)}
                  >
                    Remove from Cart
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div>
            {cart.length > 0 ? (
              <button className="btn btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
            ) : null}
          </div>
        </div>
        <h3>Total:</h3>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/bookstore')}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default CartPage;
