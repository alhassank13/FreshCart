import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function BrandCard({ item }) {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => {
    // Navigate to the brand details page using the brand's ID
    navigate(`/brands/${item._id}`);
  };

  return (
    <div
      className="bg-white dark:bg-gray-200  overflow-hidden group shadow-lg rounded-2xl p-4 sm:p-5 flex flex-col hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer "
      title={item.name}
      onClick={handleClick} // Call handleClick on click
    >
      <img
        className="w-full scale-100 object-cover rounded-xl transition-transform duration-300 group-hover:scale-120"
        src={item.image}
        alt={item.name}
      />

      <p className="text-sm flex justify-center items-center text-gray-600  font-semibold mt-2">
        {item.name}
      </p>
    </div>
  );
}
