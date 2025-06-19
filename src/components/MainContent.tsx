import React, { use, useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Menu } from "lucide-react";
import axios from "axios";

export const MainContent = () => {
  const { minPrice, maxPrice, keyword, searchQuery, selectedCategory } =
    useFilter();
  const [product, setProduct] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropopen, setDropOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products?q={${keyword}}`;
    }
    axios
      .get(url)
      .then((response) => console.log(response.data.products))
      .catch(() => console.log("error::fecthing product failure"));
  }, [keyword, currentPage]);

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm: w-[40rem] sm:[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify_between items-center">
          <div className="relative  mb-5  mt-5">
            <button
              onClick={() => setDropOpen(!dropopen)}
              className="border  border-gray-200 px-4 py-2 flex gap-2"
            >
              <Menu />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropopen && (
              <div className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40 ">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block  px-4 py-2 text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 text-left hover:bg-gray-200"
                >
                  Luxury
                </button>
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid gird-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {" "}
        </div>
      </div>
    </section>
  );
};
