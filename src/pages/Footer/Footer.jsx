import React from "react";
import AmazonLogo from "../../assets/images/amazon-pay.png";
import AmericanLogo from "../../assets/images/American-Express-Color.png";
import mastercard from "../../assets/images/mastercard.webp";
import Paypal from "../../assets/images/paypal.png";
import AppStore from "../../assets/images/get-apple-store.png";
import PlayStore from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-8 w-full mt-auto dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 border-b border-gray-400 dark:border-gray-600 pb-6 mb-6">
        {/* Section 1: Get the freshCart app */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Get the FreshCart app
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We'll send you a link to download the app directly to your phone!
            </p>
          </div>

          {/* Email Input & Button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder-gray-400"
              type="email"
              placeholder="Enter your email"
              aria-label="Enter your email to get app link"
            />
            <button className="bg-primary hover:bg-darkPrimary text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex-shrink-0">
              Share App Link
            </button>
          </div>
        </div>

        {/* Separator Line (now part of the container's border-b) */}

        {/* Section 2: Payment & App Download Logos */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Payment Logos */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
            <span className="font-semibold text-gray-700 dark:text-gray-200 mr-2">
              Payment Partners
            </span>
            <img
              src={AmazonLogo}
              className="w-14 h-auto"
              alt="Amazon Pay logo"
            />
            <img
              src={AmericanLogo}
              className="w-14 h-auto"
              alt="American Express logo"
            />
            <img
              src={mastercard}
              className="w-14 h-auto"
              alt="Mastercard logo"
            />
            <img src={Paypal} className="w-14 h-auto" alt="PayPal logo" />
          </div>

          {/* App Download Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Get Deliveries with FreshCart
            </span>
            <div className="flex space-x-2">
              <a aria-label="Download on Google Play Store">
                <img
                  src={PlayStore}
                  className="w-28 h-auto"
                  alt="Google Play Store"
                />
              </a>
              <a aria-label="Download on Apple App Store">
                <img
                  src={AppStore}
                  className="w-28 h-auto"
                  alt="Apple App Store"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section (optional, but good practice) */}
      <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm pt-4">
        &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
