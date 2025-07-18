import React, { useEffect, useState } from "react";
import Card from "../../Compontents/Card/Card";
import axios from "axios";
import Loader from "../../Compontents/Loader/Loader";
import errorImage from "../../assets/images/error.svg";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: 1,
    numberOfPages: 0,
  });

  async function getAllProducts(page = 1) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
      );
      setProducts(data.data);
      setPaginationMeta(data.metadata);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-400 transition-colors duration-300 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
          Products
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <img src={errorImage} alt="error" className="w-full" />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((item) => (
                <Card key={item._id} item={item} />
              ))}
            </div>

            {/* Pagination Buttons */}
            {paginationMeta.numberOfPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
                {[...Array(paginationMeta.numberOfPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => getAllProducts(index + 1)}
                    className={`cursor-pointer py-2 px-4 rounded font-semibold ${
                      paginationMeta.currentPage === index + 1
                        ? "bg-primary text-white"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
