import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Menu } from "lucide-react";
import axios from "axios";
import { BookCard } from "./BookCard";

export const MainContent = () => {
  const { minPrice, maxPrice, keyword, searchQuery, selectedCategory } =
    useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropopen, setDropOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?limit=100`) // Lấy toàn bộ sản phẩm
      .then((response) => setProducts(response.data.products))
      .catch(() => console.log("error::fetching product failure"));
  }, []);
  console.log(products);
  const getFilteredProducts = () => {
    let filterProducts = [...products];
    console.log(filterProducts);
    if (keyword) {
      filterProducts = filterProducts.filter((product) =>
        product.brand.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    if (selectedCategory) {
      filterProducts = filterProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice != undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice != undefined) {
      filterProducts = filterProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filterProducts = filterProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "Expensive":
        return filterProducts.sort((a, b) => b.price - a.price);
      case "Cheap":
        return filterProducts.sort((a, b) => a.price - b.price);
      case "Popular":
        return filterProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filterProducts;
    }
  };

  const filtered = getFilteredProducts();
  const totalPage = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChangePage = (currentPage: number) => {
    if (currentPage > 0 && currentPage <= totalPage) {
      setCurrentPage(currentPage);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPage, currentPage + 2);
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  };

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] w-[20rem] p-5 flex flex-col min-h-[80vh]">
      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 mt-2">
        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropopen)}
            className="border border-gray-200 px-4 py-2 flex gap-2"
          >
            <Menu />
            {filter === "all"
              ? "Filter"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>

          {dropopen && (
            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
              <button
                onClick={() => setFilter("Cheap")}
                className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
              >
                Cheap
              </button>
              <button
                onClick={() => setFilter("Expensive")}
                className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
              >
                Expensive
              </button>
              <button
                onClick={() => setFilter("Popular")}
                className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
              >
                Popular
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product List */}
      <div className="flex-grow">
        {paginatedProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-lg font-semibold">
            Không có sản phẩm phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {paginatedProducts.map((product) => (
              <BookCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination fixed at bottom */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          className="border px-3 py-2 rounded-full"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="flex flex-wrap justify-center">
          {getPaginationButtons().map((page) => (
            <button
              key={page}
              onClick={() => handleChangePage(page)}
              className={`border px-4 py-2 mx-1 rounded-full ${
                currentPage === page ? "bg-black text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleChangePage(currentPage + 1)}
          className="border px-3 py-2 rounded-full"
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </section>
  );
};
