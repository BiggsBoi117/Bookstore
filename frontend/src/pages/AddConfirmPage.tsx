import { useNavigate, useParams } from 'react-router-dom';
import WelcomeHeader from '../components/WelcomeHeader';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import CartSummary from '../components/CartSummary';

function AddConfirmPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();
  const quantity = 1;

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No title found',
      price: Number(price) || 0,
      quantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <CartSummary />
      <WelcomeHeader />
      <div className="container">
        <div className="row">
          <br />
          <br />
          <h2>Are you sure you want to add {title} to cart?</h2>
          <h5>Price: ${price}</h5>
          <br />
          <br />
        </div>
        <div className="row justify-content-center">
          <div>
            <button className="btn btn-success" onClick={handleAddToCart}>
              Confirm
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-2 offset-md-5">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddConfirmPage;
