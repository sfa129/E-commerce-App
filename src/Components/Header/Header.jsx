import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import { useState } from 'react';


function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <nav className="bg-[#ffffff] shadow-md sticky top-0 z-50 h-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
          {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" /> */}
          ModernShop
        </Link>


        {/* Hamburger Menu (Mobile) */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 text-2xl">
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${menuOpen ? "flex" : "hidden"
            } flex-col lg:flex lg:flex-row lg:items-center gap-4 absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#ffffff] px-6 py-4 lg:p-0 shadow-md lg:shadow-none z-40`}
        >
          <Link to="/" className="text-gray-800 hover:text-gray-600 text-base font-medium">
            Home
          </Link>

          {/* Cart Icon */}
          <div className="relative">
            <Link
              to="/AddToCart"
              className="text-gray-800 hover:text-gray-600 text-base font-medium"
            >
              Cart 🛒
            </Link>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-sm text-gray-700">
              <span className="text-sm">
                Welcome, <span className="font-semibold">{user.firstName} {user.lastName}</span>
              </span>
              <button
                onClick={() => {
                  dispatch(logoutUser())
                    .unwrap()
                    .then(() => {
                      navigate("/Login");
                    })
                    .catch((err) => {
                      console.error("Logout failed:", err);
                    });
                }}
                className="bg-red-500 w-full sm:w-[150px] text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 text-base font-medium">
              <Link to="/Register" className="text-gray-800 hover:text-gray-600">
                Register
              </Link>
              <Link to="/Login" className="text-gray-800 hover:text-gray-600">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
