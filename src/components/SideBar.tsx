import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface IProduct {
  category: string;
}
interface IFetchRespone {
  products: IProduct[];
}
export const SideBar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "Apple",
    "Watch",
    "Fashion",
    "Trending",
    "Shose",
    "Shirt",
  ]);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyWord,
  } = useFilter();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };
  const handleKeywordChnage = (keyword: string) => {
    setKeyWord(keyword);
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setKeyWord("");
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setSelectedCategory("");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: IFetchRespone = await response.json();
        const uniqueCategoires = Array.from(
          new Set(data.products.map((product) => product.category))
        );

        setCategories(uniqueCategoires);
      } catch (error) {
        console.error("fetching product failure 1");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className=" w-65 p-5 h-scrren">
      <h1 className="text-2xl font-bold mb-10 mt-4">Electric Store</h1>

      <section>
        <input
          type="text"
          className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 px-2 py-2 w-full rounded sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center mt-3">
          <input
            type="text"
            className="border-gray-300  border rounded text-center mr-2 p-1 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-gray-300  border rounded text-center mr-2 p-1 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* category section */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
          </div>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleRadioChangeCategories(category)}
                className="mr-2 w-[16px] h-[16px]"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/*  */}
        <section>
          <div className="my-5">
            <h2 className="text-xl font-semibold mb-5">Keywords</h2>
          </div>
          {keywords.map((key, index) => (
            <button
              key={index}
              onClick={() => handleKeywordChnage(key)}
              className="block mb-2  px-4 py-2  w-full  text-left rounded hover:bg-gray-200"
            >
              {key.toUpperCase()}
            </button>
          ))}
        </section>
        <button
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 "
          onClick={handleResetFilter}
        >
          Reset Filter
        </button>
      </section>
    </div>
  );
};
