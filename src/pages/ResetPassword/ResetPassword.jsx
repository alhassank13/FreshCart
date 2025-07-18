// Inside ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import PasswordField from "../../Compontents/PasswordField/PasswordField"; // Assuming you have this component for password fields

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetCode } = location.state || {}; // Destructure email and resetCode

  const [isLoading, setIsLoading] = useState(false);

  // Redirect if essential data is missing
  if (!email || !resetCode) {
    toast.error(
      "Missing necessary information. Please start the password reset process again."
    );
    navigate("/forgot-password");
    return null; // Don't render if redirecting
  }

  // Yup validation schema for the new password
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: email, // Pre-fill email from state
      newPassword: "",
    },
    onSubmit: sendNewPassword,
    validationSchema,
  });

  async function sendNewPassword(values) {
    setIsLoading(true);
    const loadingToast = toast.loading("Resetting password...");

    try {
      // ✅ API call to reset the password
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword", // ✅ This is a common endpoint for setting new password
        {
          email: values.email,
          newPassword: values.newPassword,
          // Depending on your API, you might also need to send the resetCode again here.
          // If the verifyResetCode step already validated it and created a session/token,
          // then resetCode might not be needed again here. Check your API docs.
          resetCode: resetCode, // Sending resetCode again for robustness, adjust if your API doesn't need it.
        }
      );
      console.log(data);

      if (data.token) {
        // Or check `data.message === "success"`
        localStorage.setItem("userToken", data.token); // Store token if API returns one
        toast.success("Password reset successfully! You are now logged in.");
        navigate("/"); // Navigate to home or dashboard
      } else {
        toast.error(
          data.message || "Failed to reset password. Please try again."
        );
      }
    } catch (error) {
      console.error("Reset password error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center p-4 mt-12 mb-12 sm:mt-16 sm:mb-16 min-h-[calc(100vh-120px)] font-sans">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-7 text-center">
          Set New Password
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-sm">
          Please enter your new password for {email}.
        </p>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {/* Email field (read-only or hidden) */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              readOnly // Make it read-only as it's passed from previous step
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
            />
          </div>

          {/* New Password Field */}
          <PasswordField
            label="New Password"
            name="newPassword"
            formik={formik}
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.newPassword}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-darkPrimary text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!formik.isValid || isLoading}
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
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          <Link
            to="/login"
            className="text-primary hover:text-darkPrimary font-medium transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
