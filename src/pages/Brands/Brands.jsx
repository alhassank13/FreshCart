import React, { useEffect } from "react";
import BrandCard from "../../Compontents/BrandCard/BrandCard"; // Assuming BrandCard is correctly implemented
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  // Scroll to top with smooth animation on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Use useQuery to fetch brands data
  const {
    data: brandsData, // Renamed to brandsData for clarity
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brands"], // Unique key for this query
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      return response.data; // The API response directly contains the data object with 'data' array
    },
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 60, // Data stays in cache for 1 hour
  });

  // Access the actual array of brands from the fetched data
  const brands = brandsData?.data;

  // Handle loading state with a skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 animate-pulse bg-gray-300 h-10 w-1/4 rounded"></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map(
              (
                _,
                index // Show 8 skeleton cards
              ) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 w-3/4 mx-auto rounded"></div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10 flex items-center justify-center">
        <div className="text-center text-red-600 dark:text-red-400">
          <img
            src="https://placehold.co/200x200/FF0000/FFFFFF?text=Error"
            alt="Error"
            className="w-48 h-48 mx-auto mb-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/200x200/FF0000/FFFFFF?text=Error";
            }}
          />
          <h2 className="text-3xl font-bold mb-2">Failed to Load Brands</h2>
          <p className="text-lg">
            {error?.message ||
              "An unexpected error occurred. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  // Handle no brands found
  if (!brands || brands.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10 flex items-center justify-center">
        <div className="text-center text-gray-600 dark:text-gray-300">
          <h2 className="text-3xl font-bold mb-4">No Brands Found</h2>
          <p className="text-lg">
            It looks like there are no brands to display at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-400 transition-colors duration-300 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-center">
          Our Brands
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {brands.map((item) => (
            <BrandCard key={item._id} item={item} /> // Ensure BrandCard uses item._id as key
          ))}
        </div>
      </div>
    </div>
  );
}
