import { useEffect, useState } from "react";

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
        console.error("fetching product failure");
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
          className="border-2 rounded px-2  sm:mb-0"
          placeholder="Search Product"
        />

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 mb-3 py-3 w-full"
            placeholder="Min"
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 mb-3 py-3 w-full"
            placeholder="Max"
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
              className="block mb-2  px-4 py-2  w-full  text-left rounded hover:bg-gray-200"
            >
              {key.toUpperCase()}
            </button>
          ))}
        </section>
        <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 ">
          Reset Filter
        </button>
      </section>
    </div>
  );
};
