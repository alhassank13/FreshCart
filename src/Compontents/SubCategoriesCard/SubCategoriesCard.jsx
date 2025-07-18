import React from "react";

export default function CategoriesCard({ item }) {
  return (
    <div
      className="bg-white  dark:bg-gray-700 overflow-hidden group shadow-lg rounded-2xl p-4 sm:p-5 flex flex-col hover:shadow-xl transform  cursor-pointer  hover:scale-110 transition-all duration-300 ease-in-out "
      title={item.name}
    >
      <div className="group-hover:scale-130  transform  transition-all duration-300 ease-in-out cursor-pointer  ">
        <p className="text-sm flex justify-center items-center text-primary dark:text-gray-300 font-semibold  group-hover:text-darkPrimary ">
          {item.name}
        </p>
      </div>
    </div>
  );
}
