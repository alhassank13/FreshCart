import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // optional icons package

export default function PasswordField({
  label,
  name,
  formik,
  placeholder = "••••••••",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <input
        type={showPassword ? "text" : "password"}
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
      />

      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-[38px] text-gray-500 hover:text-primary"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>


    </div>
  );
}
