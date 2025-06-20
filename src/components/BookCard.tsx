import React from "react";
import { Link } from "react-router-dom"; // ✅ PHẢI import Link

interface IBookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

export const BookCard: React.FC<IBookCardProps> = ({
  id,
  title,
  image,
  price,
}) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover mb-2"
        />
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">${price}</p>
      </Link>
    </div>
  );
};
