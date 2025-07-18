import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Placeholder for a loading spinner or skeleton if you have one
// import Loader from '../../Compontents/Loader/Loader';
// import errorImage from '../../assets/images/error.svg';

export default function SpecificSubCategory({ subCategoryId }) {
  const {
    data: subCategoryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["subCategory", subCategoryId], // Unique key includes the ID
    queryFn: async () => {
      if (!subCategoryId) {
        throw new Error("SubCategory ID is required."); // Prevent fetch if no ID
      }
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`
      );
      return response.data.data; // Access the 'data' property for the subcategory object
    },
    enabled: !!subCategoryId, // Only run this query if subCategoryId is provided
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 60, // Cache data for 1 hour
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
        {/* You can replace this with your actual Loader component */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700 dark:text-gray-300">
          Loading subcategory details...
        </p>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="text-center bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-2">Error Loading SubCategory</h3>
        <p>Failed to fetch subcategory details.</p>
        <p className="text-sm">
          Error: {error?.message || "An unknown error occurred."}
        </p>
        {/* <img src={errorImage} alt="Error" className="w-24 h-auto mx-auto mt-4" /> */}
      </div>
    );
  }

  // --- No Data (e.g., ID provided but no data returned) ---
  if (!subCategoryData) {
    return (
      <div className="text-center bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 p-6 rounded-lg shadow-md">
        <p className="text-xl font-bold">SubCategory Not Found</p>
        <p className="mt-2">No data available for the provided ID.</p>
      </div>
    );
  }

  // --- Success State: Display SubCategory Data ---
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 max-w-lg mx-auto transform transition-all duration-300 hover:scale-[1.01]">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 text-center">
        {subCategoryData.name}
      </h2>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            ID:
          </strong>{" "}
          <span className="font-mono text-sm">{subCategoryData._id}</span>
        </p>
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            Slug:
          </strong>{" "}
          <span className="font-mono text-sm">{subCategoryData.slug}</span>
        </p>
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">
            Category ID:
          </strong>{" "}
          <span className="font-mono text-sm">{subCategoryData.category}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          Created At:{" "}
          {new Date(subCategoryData.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated:{" "}
          {new Date(subCategoryData.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
