import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  saveCartToFirestoreThunk,
} from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const syncCart = () => {
    if (user?.uid) {
      dispatch(saveCartToFirestoreThunk({ uid: user.uid, cartItems }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    syncCart();
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    syncCart();
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
    syncCart();
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
    syncCart();
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/Login');
    } else {
      // Redirect to Stripe Payment Link
      window.location.href = "https://buy.stripe.com/test_4gw4i5fHU2zsdUI3cc";
    }
  };

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <Link to="/" className="text-blue-600 underline">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛒 Shopping Cart</h2>
      <button
        onClick={handleClearCart}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Clear Cart
      </button>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded shadow-sm">
            <img src={item.image} alt={item.title} className="h-24 w-24 object-contain" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p>Price: ${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => handleDecrease(item.id)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item.id)} className="px-2 py-1 bg-gray-300 rounded">+</button>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 text-xl font-semibold">
        Total: ${totalAmount}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCheckout}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
