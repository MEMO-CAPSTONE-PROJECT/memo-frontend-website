import { useState } from "react";
import SearchIcon from "@/components/ui/icons/dashboard/search-icon";

type SearchBarProps = {
  onSearch: (searchText: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
<div className="relative w-full mr-2">
  <SearchIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
  <input
    type="text"
    placeholder="ค้นหา..."
    value={searchText}
    onChange={handleSearchChange}
    className="w-full pl-10 p-2 border-2xsm border-title-1 rounded-sm bg-system-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

  );
};

export default SearchBar;
