import React, { useContext, useEffect } from "react";
import { wishListContext } from "../../Context/WishlistContext/WishlistContext";
import Products from "./../../pages/Products/Products";
import BrandCard from "./../BrandCard/BrandCard";
import { cartContext } from "../../Context/CartContext/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function WishListItem({ item }) {
  const navigate = useNavigate(); // for navigation
  let { addProductToCart } = useContext(cartContext);

  const { addProductToWishList, removewishListItem, disabled } =
    useContext(wishListContext);

  async function handleBuyNow(productId) {
    await addProductToCart(productId);
    navigate("/cart");
  }

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-700 overflow-hidden group shadow-lg rounded-2xl p-4 sm:p-5 cursor-auto">
      <div className="relative">
        <Link to={`/productDetails/${item._id}`}>
          <img
            className="w-full rounded-2xl transition-transform duration-300 group-hover:scale-105 "
            src={item?.imageCover}
            alt={item.name}
          />
        </Link>

        {/* close button */}
        <button
          aria-label="close"
          className="top-4 right-4 absolute cursor-pointer text-gray-500 hover:text-gray-800 hover:font-extrabold dark:text-gray-400 dark:hover:text-gray-300 hover:scale-110 transition-all duration-300 ease-in-out "
          onClick={() => removewishListItem(item._id)}
        >
          <svg
            className="fil-current"
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L13 13"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* name and price */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">
            {item.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col jusitfy-start items-start">
        <div>
          <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-white">
            {item?.brand?.name}
          </p>
        </div>
        <div className="mt-2">
          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
            {item?.title}
          </p>
        </div>
        <div className="mt-6">
          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
            {item?.category?.name}
          </p>
        </div>
        <div className="mt-6">
          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">
            ${item?.price}
          </p>
        </div>

        {/* buttons buy now and add to cart */}
        <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
          <div className="w-full">
            <button
              className="bg-green-600 rounded-3xl hover:bg-green-700 focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 cursor-pointer"
              onClick={() => handleBuyNow(item._id)}
            >
              Buy now
            </button>
          </div>
          <div className="w-full">
            <button
              className="focus:outline-none rounded-3xl cursor-pointer focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => addProductToCart(item._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
