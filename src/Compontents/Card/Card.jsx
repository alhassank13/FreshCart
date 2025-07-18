import React, { useContext } from "react";
import {
  Star,
  Heart,
  HeartOff,
  ChevronRight,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext/CartContext";
import { wishListContext } from "../../Context/WishlistContext/WishlistContext";

export default function Card({ item }) {
  let { addProductToCart } = useContext(cartContext);
  let { isInWishList, removewishListItem, addProductToWishList } =
    useContext(wishListContext);

  const inWishList = isInWishList(item._id);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-200 shadow-lg rounded-2xl flex flex-col hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer group/card">
      {/* Heart Icon */}
      <div
        className="absolute top-3 right-3 p-2 bg-white/95 shadow-md dark:bg-gray-800/70 rounded-full cursor-pointer opacity-0 group-hover/card:opacity-100 transform -translate-y-full group-hover/card:translate-y-0 transition-all duration-300 z-20 hover:scale-110"
        onClick={() =>
          inWishList
            ? removewishListItem(item._id)
            : addProductToWishList(item._id)
        }
      >
        {inWishList ? (
          <Heart className="size-5 text-red-500 fill-red-500" />
        ) : (
          <Heart className="size-5 text-gray-500" />
        )}
      </div>

      {/* Left Chevron */}
      <div className="absolute top-1/4 left-1.5 p-2 shadow-md bg-white/70 dark:bg-gray-800 rounded-full cursor-pointer opacity-0 group-hover/card:opacity-100 transform -translate-x-full group-hover/card:translate-x-0 transition-all duration-300 z-20">
        <ChevronLeft className="size-5 text-gray-500" />
      </div>

      {/* Right Chevron */}
      <div className="absolute top-1/4 right-1.5 p-2 shadow-md bg-white/70 dark:bg-gray-800/70 rounded-full cursor-pointer opacity-0 group-hover/card:opacity-100 transform translate-x-full group-hover/card:translate-x-0 transition-all duration-300 z-20">
        <ChevronRight className="size-5 text-gray-500" />
      </div>

      <Link
        to={`/productDetails/${item._id}`}
        className="p-4 sm:p-5 flex flex-col flex-grow"
      >
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl mb-4 group/image">
          <img
            className="w-full scale-110 object-cover rounded-xl transition-transform duration-300 group-hover/image:scale-125"
            src={item.imageCover}
            alt={item.title || "product image"}
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full opacity-90">
            New
          </div>
        </div>

        {/* Brand */}
        <p className="text-sm text-gray-600 dark:text-gray-500 font-semibold mb-1">
          {item.brand?.name}
        </p>

        {/* Title & Rating */}
        <div className="flex justify-between items-start mb-1">
          <h3
            className="text-base font-semibold text-gray-900  line-clamp-2"
            title={item.title}
          >
            {item.title?.split(" ").slice(0, 12).join(" ")}
            {item.title?.split(" ").length > 12 ? "..." : ""}
          </h3>

          <div className="flex items-center space-x-1">
            <Star className="size-5 text-yellow-400" />
            <span className="dark:text-gray-700">{item.ratingsAverage}</span>
            <span className="text-sm text-gray-600 dark:text-gray-500">
              ({item.ratingsQuantity})
            </span>
          </div>
        </div>

        {/* Category & Availability */}
        <span className="text-sm text-gray-600 dark:text-gray-500">
          {item.category?.name}
        </span>
        <div className="mt-1">
          {item.quantity > 0 ? (
            <span className="text-sm text-primary ">
              In Stock
            </span>
          ) : (
            <span className="text-sm text-red-500 dark:text-gray-300">
              Out of Stock
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="font-extrabold text-primary dark:text-blue-400">
            ${item.price}
          </p>
        </div>
      </Link>

      {/* Add to Cart Floating Button */}
      <div
        className="flex justify-between items-center absolute bottom-3.5 right-4"
        onClick={() => addProductToCart(item._id)}
      >
        <button
          type="button"
          className="bg-primary hover:bg-darkPrimary text-white p-1 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-base cursor-pointer"
        >
          <ShoppingCart className="size-6" />
        </button>
      </div>
    </div>
  );
}
