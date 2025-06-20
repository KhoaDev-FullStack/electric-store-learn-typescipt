import { MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";

export const PopularBlog = () => {
  const blogs = [
    {
      name: "Áo Hoodie Nam Nữ Unisex",
      likes: 150,
      comments: 32,
      author: "Shop Hữu Nghị",
    },
    {
      name: "Giày Sneaker Trắng Cổ Điển",
      likes: 210,
      comments: 48,
      author: "Footwear Store",
    },
    {
      name: "Túi Xách Da Mini Vintage",
      likes: 89,
      comments: 12,
      author: "Luna Bags",
    },
    {
      name: "Quần Jean Ống Rộng Nữ",
      likes: 134,
      comments: 20,
      author: "StyleMe",
    },
    {
      name: "Áo Sơ Mi Trơn Tay Dài",
      likes: 95,
      comments: 15,
      author: "BasicWear",
    },
  ];

  return (
    <div className="bg-white  p-5 w-[23rem] mt-4 border-gray-300  ml-5 border rounded">
      <h2 className="text-2xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold mb-2">{blog.name}</span>
            </div>
            <span className="text-gray-500"> Pushlish by {blog.author}</span>
            <span className="flex items-center ">
              <MessageCircle size={16} />
              <span className="ml-2 mr-5 text-gray-500">{blog.comments}</span>
              <ThumbsUp size={16} />
              <span className="text-gray-500 ml-2">{blog.likes}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
