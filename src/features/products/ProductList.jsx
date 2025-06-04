import React, { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState(1000);
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

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">🛍️ Shop Products</h1>

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
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 space-y-6">
                    {/* Category Filter */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Category</h2>
                        {/* Back to All Button */}
                        <button
                            onClick={() => setSelectedCategory("")}
                            className="mb-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded w-full text-left"
                        >
                            ← Back to All
                        </button>

                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    className={`cursor-pointer border px-3 py-2 rounded ${selectedCategory === cat ? "bg-blue-500 text-white" : "bg-white"
                                        }`}
                                    onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Price: Up to ${priceRange}</h2>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.length > 0 ? (
                        filtered.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-xl shadow-md p-4 bg-white flex flex-col justify-between"
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-40 w-full object-contain mb-4"
                                />
                                <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
                                <p className="text-gray-700">${product.price}</p>
                                <p className="text-sm text-gray-500">{product.category}</p>
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
