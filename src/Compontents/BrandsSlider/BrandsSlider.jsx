// src/Compontents/BrandsSlider/BrandsSlider.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BrandsSlider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brandsForSlider"], // Different key from the main Brands page
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/brands"),
    staleTime: 1000 * 60 * 60, // Brands don't change often
  });

  const brands = data?.data?.data;

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 py-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (isError || !brands || brands.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        No brands available. 😔
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 py-4 px-2 sm:px-0">
      {brands.map((brand) => (
        <Link
          to={`/brands/${brand._id}`}
          key={brand._id}
          className="flex items-center space-x-2 px-5 py-2
                     bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                     rounded-full shadow-sm text-gray-800 dark:text-gray-200
                     hover:bg-primary hover:text-white dark:hover:bg-darkPrimary dark:hover:text-white
                     transition-all duration-300 ease-in-out
                     transform hover:-translate-y-1 hover:scale-105 group"
        >
          {/* Optional: Add brand image if it fits well within a small button */}
          {brand.image && (
            <img
              src={brand.image}
              alt={brand.name}
              className="w-15 object-contain rounded-full" // Smaller size for button
            />
          )}
          <span className="font-semibold text-sm sm:text-base group-hover:text-white dark:group-hover:text-white">
            {brand.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
