import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          setSelectedImage(res.data.images[0]);
        })
        .catch((err) => console.log("error fetching product:: ", err.message));
    }
  }, [id]);

  if (!product) return <div className="p-5 text-xl">Loading...</div>;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded shadow"
      >
        ← Back
      </button>

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div>
          {/* Large image */}
          <div className="border rounded overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Small thumbnails */}
          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer hover:border-blue-500 ${
                  selectedImage === img ? "border-blue-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-3 text-yellow-500 text-lg">
            ⭐ {product.rating} / 5
          </div>
          <p className="text-3xl text-red-600 font-bold">${product.price}</p>
          <p className="text-gray-700 text-base leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 mt-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold shadow">
              Mua ngay
            </button>
            <button className="bg-white border hover:bg-gray-100 px-6 py-3 rounded font-semibold shadow">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
