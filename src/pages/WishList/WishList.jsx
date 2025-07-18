import React, { useContext, useEffect } from "react";
import { wishListContext } from "../../Context/WishlistContext/WishlistContext";
import WishListItem from "../../Compontents/WishListItem/WishListItem";

export default function WishList() {
  const { wishList, getLoggedUserWishList, isLoading } =
    useContext(wishListContext);

  useEffect(() => {
    getLoggedUserWishList();
  }, []);

  const SkeletonCard = () => (
    <div className="relative animate-pulse flex flex-col bg-gray-200 dark:bg-slate-400 overflow-hidden shadow-lg rounded-2xl p-4 sm:p-5 cursor-auto ">
      <div className="h-40 sm:h-48 bg-gray-300 dark:bg-bg-slate-400 rounded-xl mb-4" />
      <div className="h-4 w-4 absolute top-4 right-4 rounded-full bg-gray-400 dark:bg-slate-400" />
      <div className="w-3/4 h-5 bg-gray-400 dark:bg-slate-400 rounded mb-3" />
      <div className="space-y-2">
        <div className="w-2/3 h-4 bg-gray-400 dark:bg-slate-400 rounded" />
        <div className="w-1/2 h-4 bg-gray-400 dark:bg-slate-400 rounded" />
        <div className="w-1/3 h-4 bg-gray-400 dark:bg-slate-400 rounded" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <div className="h-10 w-full bg-green-500 rounded-full" />
        <div className="h-10 w-full bg-gray-800 rounded-full" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="dark:bg-slate-400">
        <div className="container mt-12 px-4 md:px-6 2xl:px-0 ">
          <div className="mt-2 w-1/2 h-4 bg-gray-400 rounded" />
          <div className="mt-2 w-1/3 h-5 bg-gray-400 rounded" />
          <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 cursor-pointer">
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" dark:bg-slate-400">
      <div className="container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-black">
              Wishlists
            </h1>
          </div>
          <div className="mt-4">
            <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-black">
              {wishList?.count || 0} Items
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 cursor-pointer">
            {wishList?.count > 0 ? (
              wishList.data.map((item) => (
                <WishListItem key={item._id} item={item} />
              ))
            ) : (
              <div className="flex items-center justify-center p-4 col-span-full">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Your Wishlist is Empty.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
