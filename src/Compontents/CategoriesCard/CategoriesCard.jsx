import React from "react";

export default function CategoriesCard({ item }) {
  return (
    <div
      className="bg-white dark:bg-gray-700 overflow-hidden group shadow-lg rounded-2xl p-4 sm:p-5 flex flex-col hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer "
      title={item.name}
    >
      {/* Product Image and Overlay Icons */}
      <div>
        <div className="relative overflow-hidden rounded-xl mb-4  ">
          <img
            className="w-full scale-100 h-85  object-cover rounded-xl transition-transform duration-300 group-hover:scale-120"
            src={item.image}
            alt={item.brand}
          />
        </div>
        <div>
          <p className="text-sm flex justify-center items-center text-primary dark:text-gray-300 font-semibold group-hover:text-darkPrimary group-hover:text-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
            {item.name}
          </p>
        </div>
      </div>
    </div>
  );
}
