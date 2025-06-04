function CategoryCard({ name, image }) {
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={name}
      />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      </div>
    </div>
  );
}

export default CategoryCard;
