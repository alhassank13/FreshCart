import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [isLoading, setIsLoading] = useState(false);

  if (!email) {
    toast.error("Missing email context. Please start from Forgot Password.");
    navigate("/forgot-password");
    return null;
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^\d{6}$/, "Reset code must be a 6-digit number"),
  });

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: sendResetCodeToVerify,
  });

  async function sendResetCodeToVerify(values) {
    setIsLoading(true);
    const loadingToast = toast.loading("Verifying code...");

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: values.resetCode }
      );

      console.log("API response:", data);

      // ✅ FIXED: Check the correct key
      if (data.status === "Success") {
        toast.success("Code verified successfully!");
        navigate("/reset-password", {
          state: { email: email, resetCode: values.resetCode },
        });
      } else {
        toast.error(data.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verify reset code error:", error);
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center p-4 mt-12 mb-12 sm:mt-16 sm:mb-16 min-h-[calc(100vh-120px)] font-sans">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-7 text-center">
          Verify Reset Code
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-sm">
          Please enter the 6-digit verification code sent to your email address
          ({email}).
        </p>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="resetCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 text-center text-lg tracking-widest"
              placeholder="e.g., 123456"
              maxLength="6"
            />
            {formik.touched.resetCode && formik.errors.resetCode ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.resetCode}
              </div>
            ) : null}
          </div>
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
              "Verify Code"
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Didn't receive the code?{" "}
          <Link
            to="/forgot-password"
            className="text-primary hover:text-darkPrimary font-medium transition-colors"
          >
            Resend Code
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
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
