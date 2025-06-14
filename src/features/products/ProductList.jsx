import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from "../cart/cartSlice";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState(200);
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"];

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            setProducts(data);
            setFiltered(data);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filteredData = products.filter((product) => {
            return (
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                product.price <= priceRange &&
                (selectedCategory === "" || product.category === selectedCategory)
            );
        });
        setFiltered(filteredData);
    }, [searchTerm, priceRange, selectedCategory, products]);

    // AddToCart Functionalty
    const dispatch = useDispatch();
    
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">🛍️ Featured Products</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
                />
            </div>

            {/* Layout: Sidebar + Product Grid */}
            <div className="flex flex-col md:flex-row gap-6 ">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 p-4 bg-white rounded-xl shadow-lg space-y-8 h-[465px]">
                    {/* Category Filter */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Category</h2>

                        <button
                            onClick={() => setSelectedCategory("")}
                            className="mb-3 w-full text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded transition"
                        >
                            ← Back to All
                        </button>

                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                                    className={`cursor-pointer px-4 py-2 rounded-md transition font-medium ${selectedCategory === cat
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                                        }`}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            Price: <span className="text-blue-600 font-bold">${priceRange}</span>
                        </h2>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            step="10"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full accent-blue-600"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>$0</span>
                            <span>$200</span>
                        </div>
                    </div>
                </div>


                {/* Product Grid */}
                <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.length > 0 ? (
                        filtered.map((product) => (

                            //with stripe
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
                            >
                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-44 w-full object-contain mb-4 transform hover:scale-105 transition-transform duration-300"
                                />

                                {/* Product Title */}
                                <h2 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
                                    {product.title}
                                </h2>

                                {/* Price & Category */}
                                <p className="text-blue-600 font-bold text-md mb-1">${product.price}</p>
                                <p className="text-sm text-gray-500 mb-2">{product.category}</p>

                                {/* Details Link */}
                                <Link to={`/product/${product.id}`} className="mt-2">
                                    <button className="cursor-pointer w-full bg-white-600 text-black hover:bg-gray-600 hover:text-white border border-black hover:text-black py-2 rounded-md  transition">
                                        Details
                                    </button>
                                </Link>

                                {/* Cart + Stripe */}
                                <div className="mt-3 space-y-2">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="cursor-pointer w-full bg-white-600 text-black hover:bg-gray-600 hover:text-white border border-black  py-2 rounded-md transition"
                                    >
                                        Add to Cart
                                    </button>

                                    <a
                                        href="https://buy.stripe.com/test_bJeeV6cXW590dDhb8A9MY00"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-center border border-gray-300 text-white bg-black hover:bg-white hover:text-black  py-2 rounded-md transition"
                                    >
                                        Buy Now
                                    </a>
                                </div>
                            </div>

                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full">No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
