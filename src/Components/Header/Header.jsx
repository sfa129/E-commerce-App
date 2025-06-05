import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="bg-[#fff7e3] h-[60px] flex ">
      <div className='flex items-center justify-between w-[950px] mx-auto'>
        <h1 className='text-2xl font-semibold cursor-pointer'>E-Commerce</h1>
        <div className='flex gap-10 w-[250px]'>
          <Link to="/">Home</Link>
          {/* <Link to="/AddToCart">Add To Cart</Link> */}
          <div className="relative">
            <Link to="/AddToCart">
              🛒Cart
            </Link>
            {totalQuantity > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>
          <Link to="/Login">Login</Link>
        </div>
      </div>



    </nav>
  );
}

export default Header;
