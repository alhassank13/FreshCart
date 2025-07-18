import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext/CartContext";
import { Link } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import { wishListContext } from "../../Context/WishlistContext/WishlistContext";

export default function CartItem({ item }) {
  const { removeCartItem, updateCartItem, disabled } = useContext(cartContext);
  const [count, setCount] = useState(item?.count || 1);

  let { isInWishList, removewishListItem, addProductToWishList } =
    useContext(wishListContext);

  const inWishList = isInWishList(item.product?._id);

  useEffect(() => {
    setCount(item?.count || 1);
  }, [item?.count]);

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      updateCartItem(newCount, item.product._id);
    }
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCartItem(newCount, item.product._id);
  };

  const handleCount = () => {
    const parsedCount = parseInt(count, 10);
    if (!isNaN(parsedCount) && parsedCount > 0 && parsedCount !== item.count) {
      updateCartItem(parsedCount, item.product._id);
    } else {
      setCount(item.count); // Reset to actual if invalid
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        {/* Image */}
        <Link
          to={`/productDetails/${item.product._id}`}
          className="shrink-0 md:order-1"
        >
          <img
            className="h-20 w-20 object-cover rounded"
            src={item?.product.imageCover}
            alt={item?.product.title}
          />
        </Link>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              disabled={disabled}
              type="button"
              onClick={handleDecrement}
              className="disabled:cursor-not-allowed  cursor-pointer inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white "
                fill="none"
                viewBox="0 0 18 2"
              >
                <path d="M1 1h16" stroke="currentColor" strokeWidth={2} />
              </svg>
            </button>

            <input
              type="number"
              min={1}
              value={count}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 1) setCount(value);
              }}
              onBlur={handleCount}
              className="w-10 text-center cursor-pointer text-sm font-medium text-gray-900 bg-transparent dark:text-white border-0 focus:outline-none"
            />

            <button
              disabled={disabled}
              type="button"
              onClick={handleIncrement}
              className="disabled:cursor-not-allowed cursor-pointer inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 dark:text-white "
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  d="M9 1v16M1 9h16"
                  stroke="currentColor"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900 dark:text-white">
              ${(item.price * item.count).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold mb-1">
            {item?.product?.brand?.name}
          </p>
          <p
            title={item?.product.title}
            className="text-base font-medium text-gray-900 dark:text-white"
          >
            {item?.product.title}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                inWishList
                  ? removewishListItem(item.product?._id)
                  : addProductToWishList(item.product?._id)
              }
              type="button"
              className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              {/* <svg className="me-1.5 h-5 w-5" fill="none " viewBox="0 0 24 24">
                <path
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  stroke="currentColor"
                  strokeWidth={2}
                />
              </svg> */}
              {inWishList ? (
                <Heart className="size-5 text-red-500 fill-red-500" />
              ) : (
                <Heart className="size-5 text-gray-500" />
              )}
              Add to Favorites
            </button>

            <button
              type="button"
              onClick={() => removeCartItem(item.product._id)}
              className="cursor-pointer inline-flex items-center text-sm font-medium text-red-600 hover:bg-red-500 hover:rounded-2xl hover:text-white dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white"
            >
              <svg className="me-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M6 18 17.94 6M18 18 6.06 6"
                  stroke="currentColor"
                  strokeWidth={2}
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
