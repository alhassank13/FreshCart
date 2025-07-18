import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { AlertMessage } from "../../Compontents/AlertMessage/AlertMessage";
import PasswordField from "../../Compontents/PasswordField/PasswordField";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, verifyToken } = useContext(authContext);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Formik Form Management
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToLogIn,
    validationSchema,
  });

  // Handle Login
  async function sendDataToLogIn(values) {
    setIsLoading(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message === "success" && data.token) {
        localStorage.setItem("userToken", data.token); // ✅ Match with other code
        verifyToken();
        setToken(data.token);

        toast.success("Login successful!");
        navigate("/"); // ✅ Navigate after setting token
      } else {
        toast.error("Login failed: Unexpected response.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ||
        "An unexpected error occurred during login.";
      toast.error(message);
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center p-4 mt-12 mb-12 sm:mt-16 sm:mb-16 min-h-[calc(100vh-120px)]">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-7 text-center">
          Login to Your Account
        </h2>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="you@example.com"
            />
            <AlertMessage formik={formik} field="email" />
          </div>

          {/* Password Field */}
          <PasswordField label="Password" name="password" formik={formik} />
          <AlertMessage formik={formik} field="password" />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label
              htmlFor="rememberMe"
              className="flex items-center text-gray-600 dark:text-gray-300 cursor-pointer"
            >
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-primary dark:checked:border-transparent cursor-pointer"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-primary hover:text-darkPrimary font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary  hover:bg-darkPrimary text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!(formik.isValid && formik.dirty) || isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25 "
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75 "
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-darkPrimary font-medium transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
