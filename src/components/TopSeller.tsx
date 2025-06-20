import React, { useEffect, useState } from "react";

interface Authors {
  name: "string";
  isFllowing: boolean;
  image: string;
}
export const TopSeller = () => {
  const [authors, setAuthors] = useState<Authors[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=5`);
        const data = await response.json();

        const authorData: Authors[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorData);
      } catch (error) {
        console.error("Error fetching authors::", error);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFllowing: !author.isFllowing } : author
      )
    );
  };

  return (
    <div className="bg-white p-5 mx-5 mt-[5rem] border border-gray-300 shadow:md w-[23rem] rounded">
      <h2 className="text-2xl font-bold mb-5">Top Sellers</h2>
      {authors.map((author, index) => (
        <li key={index} className="flex items-center justify-between mb-4">
          <section className="flex justify-center items-center">
            <img
              src={author.image}
              alt={author.name}
              className="w-[25%] h-[25%] rounded-full"
            />
            <span className="ml-4">{author.name}</span>
          </section>
          <button
            onClick={() => handleFollowClick(index)}
            className={`py-1 px-3 rounded ${
              author.isFllowing
                ? "bg-red-600 text-white"
                : "bg-black text-white"
            }`}
          >
            {author.isFllowing ? "Unfollo" : "Following"}{" "}
          </button>
        </li>
      ))}
    </div>
  );
};
