import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-[#fff7e3] h-[60px] flex ">
      <div className='flex items-center justify-between w-[950px] mx-auto'>
        <h1 className='text-2xl font-semibold cursor-pointer'>E-Commerce</h1>
        <div className='flex gap-10 w-[250px]'>
          <Link to="/">Home</Link>
          <Link to="/AddToCart">Add To Cart</Link>
          <Link to="/Login">Login</Link>
        </div>
      </div>

      

    </nav>
  );
}

export default Header;
