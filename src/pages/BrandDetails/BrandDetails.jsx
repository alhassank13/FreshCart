import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Assuming you are using React Router for navigation
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function BrandDetails() {
  const { id } = useParams(); // Get the brand ID from the URL parameters

  // Scroll to top with smooth animation on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Use useQuery to fetch data for the specific brand
  const {
    data: brandDetailData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brand", id], // Unique key for this query, includes the brand ID
    queryFn: async () => {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      return response.data; // The API response directly contains the data object
    },
    enabled: !!id, // Only run the query if 'id' is available
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 60, // Data stays in cache for 1 hour
  });

  // Access the actual brand object from the fetched data
  const brand = brandDetailData?.data;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
            Loading brand details...
          </p>
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
          />
          <h2 className="text-3xl font-bold mb-2">
            Failed to Load Brand Details
          </h2>
          <p className="text-lg">
            {error?.message ||
              "An unexpected error occurred. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  // Handle no brand found
  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10 flex items-center justify-center">
        <div className="text-center text-gray-600 dark:text-gray-300">
          <h2 className="text-3xl font-bold mb-4">Brand Not Found</h2>
          <p className="text-lg">
            The brand you are looking for does not exist or could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 text-center">
          Brand Details
        </h2>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {brand.name}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">ID:</span> {brand._id}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Slug:</span> {brand.slug}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(brand.createdAt).toLocaleDateString()}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Last Updated:</span>{" "}
              {new Date(brand.updatedAt).toLocaleDateString()}
            </p>
            {/* You can add more details here if the API provides them */}
          </div>
        </div>
      </div>
    </div>
  );
}
