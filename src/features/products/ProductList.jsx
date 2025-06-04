// ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice";

export default function ProductList() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
    if (!Array.isArray(items)) return <p>No products found.</p>;

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {items.map(product => (
                <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '200px', height: '400px', padding:"50px"}}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Rating: {product.rating.rate} ⭐ ({product.rating.count})</p>
                </div>
            ))}
        </div>
    );
}
