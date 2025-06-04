import React from 'react';
import heroimg from '../../assets'
import Categories from '../Categories/Categories';

function Home() {
  return (
    <>
    <div>
      <img className='h-[250px] w-auto my-200px' src={heroimg} alt="heroimg" />
    </div>
    <div className='my-10 flex justify-center'>
    <Categories />
    </div>
    </>
)
}

export default Home