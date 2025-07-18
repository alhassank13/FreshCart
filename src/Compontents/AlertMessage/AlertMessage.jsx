import React from "react";

// Reusable inline alert message - Now handles dark mode and better spacing
function InputError({ alertMessage }) {
  return (
    <div
      className="bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-100 px-4 py-2 rounded relative mt-2 text-sm flex items-center transition-colors duration-300"
      role="alert" // Added for accessibility
    >
      <svg
        viewBox="0 0 24 24"
        className="text-red-600 dark:text-red-300 w-5 h-5 mr-2 flex-shrink-0"
      >
        {/* Your existing SVG path */}
        <path
          fill="currentColor"
          d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
        />
      </svg>
      <span className="block sm:inline">{alertMessage}</span>{" "}
      {/* Use block/inline for better text flow */}
    </div>
  );
}

// Main component to conditionally render the error message
export function AlertMessage({ formik, field }) {
  return (
    <>
      {formik.errors[field] && formik.touched[field] && (
        <InputError alertMessage={formik.errors[field]} />
      )}
    </>
  );
}
