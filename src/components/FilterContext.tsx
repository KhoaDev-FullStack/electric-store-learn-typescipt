import { useContext, createContext, ReactNode, useState } from "react";

interface IFilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;

  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;

  keyword: string;
  setKeyWord: (key: string) => void;
}

const FilterContext = createContext<IFilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [keyword, setKeyWord] = useState<string>("");

  const value: IFilterContextType = {
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
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
