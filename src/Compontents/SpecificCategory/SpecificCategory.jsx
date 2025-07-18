import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Assuming you have these components for consistent UI
// import Loader from '../../Compontents/Loader/Loader';
// import errorImage from '../../assets/images/error.svg';

export default function SpecificCategory({ categoryId }) {
  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["specificCategory", categoryId], // Unique key including the categoryId
    queryFn: async () => {
      if (!categoryId) {
        throw new Error("Category ID is required."); // Ensure ID is provided
      }
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
      );
      return response.data.data; // Return the specific category object
    },
    enabled: !!categoryId, // Only run the query if categoryId is truthy
    staleTime: 1000 * 60 * 60, // Data considered fresh for 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // Cache data for 24 hours
    refetchOnWindowFocus: false, // Do not refetch on window focus
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // 1-second delay between retries
  });

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
        {/* Replace with your actual Loader component if available */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <p className="ml-4 text-gray-700 dark:text-gray-300">
          Loading category details...
        </p>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="text-center bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">Error Loading Category</h3>
        <p>Failed to fetch category details.</p>
        <p className="text-sm">
          Error: {error?.message || "An unknown error occurred."}
        </p>
        {/* Uncomment if you have an error image */}
        {/* <img src={errorImage} alt="Error" className="w-24 h-auto mx-auto mt-4" /> */}
      </div>
    );
  }

  // --- No Data Found State ---
  if (!categoryData) {
    return (
      <div className="text-center bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 p-6 rounded-lg shadow-md">
        <p className="text-xl font-bold">Category Not Found 😕</p>
        <p className="mt-2">No data available for the provided category ID.</p>
      </div>
    );
  }

  // --- Success State: Display Category Data ---
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 max-w-lg mx-auto flex flex-col items-center transform transition-all duration-300 hover:scale-[1.01]">
      <img
        src={categoryData.image}
        alt={categoryData.name}
        className="w-48 h-48 object-cover rounded-full shadow-md mb-6 border-4 border-blue-400 dark:border-blue-600"
      />
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 text-center">
        {categoryData.name}
      </h2>
      <div className="w-full space-y-3 text-gray-700 dark:text-gray-300 text-left">
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            ID:
          </strong>{" "}
          <span className="font-mono text-sm break-all">
            {categoryData._id}
          </span>
        </p>
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            Slug:
          </strong>{" "}
          <span className="font-mono text-sm break-all">
            {categoryData.slug}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          Created At:{" "}
          {new Date(categoryData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated:{" "}
          {new Date(categoryData.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
