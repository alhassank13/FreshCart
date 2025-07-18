import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../../Compontents/Card/Card";
import { cartContext } from "../../Context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import { wishListContext } from "../../Context/WishlistContext/WishlistContext";
import { Heart } from "lucide-react"; // Only need Heart, HeartOff is handled by conditional rendering
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const navigate = useNavigate();
  const { isInWishList, removewishListItem, addProductToWishList } =
    useContext(wishListContext);

  // Scroll to top with smooth animation on component mount or 'id' change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling animation
    });
  }, [id]); // Dependency array includes 'id' so it scrolls to top when product changes

  // Query for product details
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async ({ queryKey }) => {
      const productId = queryKey[1];
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
    },
    // Keep data fresh for a short period after successful fetch
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Cache data for a longer period
    cacheTime: 1000 * 60 * 60, // 1 hour
  });

  const product = productData?.data?.data;
  const categoryId = product?.category?._id;

  // Query for related products, dependent on product details being loaded
  const {
    data: productsRelatedData,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
    error: relatedError,
  } = useQuery({
    queryKey: ["productsRelated", categoryId],
    queryFn: async ({ queryKey }) => {
      const category = queryKey[1];
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/?category[in]=${category}`
      );
    },
    enabled: !!categoryId, // Only run this query if categoryId is available
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });

  console.log("relatedProducts", categoryId);

  const relatedProducts = productsRelatedData?.data?.data;

  const inWishList = isInWishList(product?._id);

  async function handleBuyNow(productId) {
    await addProductToCart(productId);
    navigate("/cart");
  }

  // --- Loading States ---
  if (isProductLoading) {
    return (
      <div className="m-4 dark:bg-slate-400">
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden animate-pulse">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-4 relative">
              <div className="w-full bg-gray-200 h-64 rounded-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-200 rounded-full" />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-6 bg-gray-200 rounded w-2/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full mb-4" />
              <div className="flex items-center mb-4">
                <div className="w-2/5 h-4 bg-gray-200 rounded mr-2" />
                <div className="w-1/5 h-4 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="h-8 bg-gray-200 rounded w-1/5 inline-block mr-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/5 inline-block" />
                </div>
                <div className="w-1/5 h-4 bg-gray-200 rounded" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="flex space-x-4">
                <div className="flex-1 h-10 bg-gray-200 rounded" />
                <div className="flex-1 h-10 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-10">
          <div className="h-6 bg-gray-200 rounded w-2/4 mb-6" />
          <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Error States ---
  if (isProductError) {
    return (
      <div className="text-center text-red-600 py-16">
        <h2 className="text-3xl font-bold mb-2">Error loading product!</h2>
        <p>{productError.message || "Failed to fetch product details."}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 py-16">
        <h2 className="text-3xl font-bold mb-2">Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <>
    <div className="bg-gray-100 dark:bg-slate-400 ">
            <div className="m-4 max-w-4xl mx-auto rounded-lg overflow-hidden dark:bg-slate-400">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/3 p-4 relative">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg"
            />
            <div
              className="absolute top-2 right-2 text-red-500 hover:text-red-600 focus:outline-none cursor-pointer"
              onClick={() =>
                inWishList
                  ? removewishListItem(product._id)
                  : addProductToWishList(product._id)
              }
            >
              {inWishList ? (
                <Heart className="size-5 text-red-500 fill-red-500" />
              ) : (
                <Heart className="size-5 text-gray-500" />
              )}
            </div>

            {/* Swiper for product images */}
            <Swiper
              className="cursor-pointer mt-4" // Added margin-top for spacing
              spaceBetween={10}
              slidesPerView={3}
            >
              {product.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`product-${index}`}
                    className="w-full h-16 object-cover rounded"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Details */}
          <div className="md:w-2/3 p-6">
            <p className="font-bold text-gray-600 mb-4">{product.brand.name}</p>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                {product.ratingsAverage} ★
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {product.ratingsQuantity} reviews
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                  ${(product.price * 1.1).toFixed(2)}
                </span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Save 10%
              </span>
            </div>

            <p className="text-green-600 text-sm font-semibold mb-4">
              Free Delivery
            </p>

            <div className="flex space-x-4 ">
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 cursor-pointer"
                onClick={() => handleBuyNow(product._id)}
              >
                Buy Now
              </button>

              <button
                className="flex-1 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
                onClick={() => addProductToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Related Products */}
      <div className="container mx-auto px-4 m-10 ">
        <div className="h-1 bg-primary mb-6 "></div>
        <h3 className="text-2xl font-extrabold text-gray-800 mb-4">
          Related Products
        </h3>
        <div className="h-1 w-1/8 bg-primary mb-6"></div>

        {isRelatedLoading && (
          <p className="text-center">Loading related products...</p>
        )}
        {isRelatedError && (
          <p className="text-center text-red-500">
            Error loading related products: {relatedError.message}
          </p>
        )}
        {!relatedProducts?.length && !isRelatedLoading && !isRelatedError && (
          <p className="text-center text-gray-500">
            No related products found.
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {relatedProducts?.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>

    </>
  );
}
