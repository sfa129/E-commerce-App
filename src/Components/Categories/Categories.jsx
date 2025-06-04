import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard.jsx";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/ecommerce/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading categories...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {categories.map((cat) => (
          <CategoryCard key={cat._id} name={cat.name} image={cat.image} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
