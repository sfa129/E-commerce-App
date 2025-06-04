import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  //AddToCart
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back to Products</Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 object-contain h-64 border rounded"
        />

        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold text-green-700">${product.price}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-yellow-600">
            Rating: {product.rating?.rate} ⭐ ({product.rating?.count} reviews)
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
