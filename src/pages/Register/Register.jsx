import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AlertMessage } from "../../Compontents/AlertMessage/AlertMessage"; // Assuming this component exists and works
import PasswordField from "../../Compontents/PasswordField/PasswordField"; // Assuming this component exists and works

export default function Register() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  // Regular expressions for validation
  const passReg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phoneReg = /^01[0125][0-9]{8}$/; // Valid Egyptian mobile numbers

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters") // Changed from 4 to 3, common for names
      .max(20, "Name must be less than 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passReg,
        "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character."
      ),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"), // Clearer message
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        phoneReg,
        "Phone must be a valid Egyptian mobile number (e.g., 010..., 011..., 012..., 015...)"
      ), // More descriptive message
  });

  // Formik setup
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDataToSignUp, // Direct assignment, no need for arrow function
    validationSchema,
  });

  // Function to send data to signup API
  async function sendDataToSignUp(values) {
    setIsLoading(true); // Set loading to true when submission starts
    let loadingToast = toast.loading("Registering..."); // Improved loading message

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(res); // Log full response for debugging
      toast.success("Account created successfully!"); // More user-friendly message
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error); // Log the full error for debugging
      // Check for specific error message from API
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred during registration.");
      }
    } finally {
      toast.dismiss(loadingToast); // Dismiss loading toast regardless of success/failure
      setIsLoading(false); // Set loading back to false
    }
  }

  return (
    <div className="flex items-center justify-center p-4 mt-12 mb-12 sm:mt-16 sm:mb-16 min-h-[calc(100vh-120px)]">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-7 text-center">
          Create an Account
        </h2>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name" // Added id for better accessibility with label
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="Your full name" // More descriptive placeholder
            />
            <AlertMessage formik={formik} field="name" />
          </div>

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
              id="email" // Added id
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="you@example.com" // Standard email placeholder
            />
            <AlertMessage formik={formik} field="email" />
          </div>

          {/* Password Field */}
          <PasswordField label="Password" name="password" formik={formik} />
          <AlertMessage formik={formik} field="password" />

          {/* Confirm Password Field */}
          <PasswordField
            label="Confirm Password"
            name="rePassword"
            formik={formik}
          />
          <AlertMessage formik={formik} field="rePassword" />

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone
            </label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phone" // Added id
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              placeholder="01012345678" // Example Egyptian number
            />
            <AlertMessage formik={formik} field="phone" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-darkPrimary text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!(formik.isValid && formik.dirty) || isLoading} // Disable button when not valid/dirty or loading
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary hover:text-darkPrimary font-medium transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
}
