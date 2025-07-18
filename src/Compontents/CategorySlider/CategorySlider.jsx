// src/Compontents/CategorySlider/CategorySlider.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
    staleTime: 1000 * 60 * 60, // Categories don't change often
  });

  const categories = data?.data?.data;

  if (isLoading) {
    return (
      <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-32 animate-pulse">
            <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError || !categories || categories.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        No categories available.
      </div>
    );
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4 custom-scrollbar">
      {categories.map((category) => (
        <Link
          to={`/categories/${category._id}`}
          key={category._id}
          className="flex-shrink-0 w-32 text-center group"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-32 h-32 object-cover rounded-full shadow-md group-hover:scale-105 transition-transform duration-200 border-2 border-transparent group-hover:border-primary dark:group-hover:border-blue-400"
          />
          <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-darkPrimary">
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
