"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  setLocation: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setLocation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);

    try {
      setLocation(searchTerm.trim());
      setSearchTerm("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative" role="search">
      <label htmlFor="city-search" className="sr-only">
        Search for a city
      </label>
      <input
        id="city-search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a city..."
        disabled={isLoading}
        className="w-64 py-2 pl-4 pr-10 rounded-lg bg-[#1e1e1e] text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 disabled:opacity-50"
        disabled={isLoading}
        aria-label="Search"
      >
        <FaSearch className={isLoading ? "animate-spin" : ""} />
      </button>
    </form>
  );
};

export default SearchBar;
