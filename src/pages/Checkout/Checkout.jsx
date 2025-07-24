import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AlertMessage } from "../../Compontents/AlertMessage/AlertMessage";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout() {
  let { cart, getLoggedUserCart } = useContext(cartContext);

  let navegate = useNavigate();

  let [pay, setPay] = useState("online");

  useEffect(() => {
    const fetchCart = async () => {
      await getLoggedUserCart();
    };
    fetchCart();
  }, [getLoggedUserCart]); // Added getLoggedUserCart to dependency array

  const total = cart?.data?.totalCartPrice || 0;
  const discount = (total * 0.1).toFixed(2); // Formatted to 2 decimal places
  const originalPrice = (total + parseFloat(discount)).toFixed(2); // Ensure calculation with float
  // const Savings = originalPrice - total; // Not used in the JSX, so removed to keep it clean

  const phoneReg = /^01[0125][0-9]{8}$/; // Valid Egyptian mobile numbers

  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        phoneReg,
        "Phone must be a valid Egyptian mobile number (e.g., 010..., 011..., 012..., 015...)"
      ),
    // Added validation for name and email fields
    name: Yup.string().required("Your name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Your email is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "Cairo", // Set initial value for city
      name: "", // Added initial value for name
      email: "", // Added initial value for email
    },
    onSubmit: (x) => {
      // payOnLine(x);
      if (pay === "cashOnDelivery") {
        payCash(x);
      } else {
        payOnLine(x);
      }
      // console.log("Form submitted with values:", values);
      // Handle form submission here
      // You would typically send this data to your backend for order processing
    },
    validationSchema,
  });

  async function payOnLine(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://fresh-cart-seven-tau.vercel.app`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      // console.log(data);
      if (data.status === "success") {
        navegate("/allorders");
        toast.success("Your Order has been Placed Successfully 🎉🎉🎉");
        // window.location.href = data.session.url;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function payCash(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log("cart", data);
      if (data.status === "success") {
        navegate("/allorders");
        toast.success("Your Order has been Placed Successfully 🎉🎉🎉");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="dark:bg-slate-400">
      <section className="bg-white py-8 antialiased md:py-16 dark:bg-slate-400">
        <form
          onSubmit={formik.handleSubmit}
          action="#"
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          {/* Progress Indicator */}
          <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:bg-primary after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <button
                type="button"
                className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden text-primary"
              >
                <Link to="/cart" className="flex items-center">
                  <svg
                    className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Cart
                </Link>
              </button>
            </li>
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden text-primary">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Checkout
              </span>
            </li>
            <li className="flex shrink-0 items-center">
              <svg
                className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-gray-900 dark:text-white">
                Order summary
              </span>
            </li>
          </ol>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            {/* Delivery Details and Payment Section */}
            <div className="min-w-0 flex-1 space-y-8">
              {/* Delivery Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="your_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="your_name"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Bonnie Green"
                    />
                    <AlertMessage formik={formik} field="name" />
                  </div>
                  <div>
                    <label
                      htmlFor="your_email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="your_email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="name@flowbite.com"
                    />
                    <AlertMessage formik={formik} field="email" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="select-country-input-3"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <select
                      id="select-country-input-3"
                      // This select is currently hardcoded to Egypt, not part of formik state
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option defaultValue>Egypt</option>
                    </select>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="select-city-input-3"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <select
                      id="select-city-input-3"
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option value="Cairo">Cairo</option>
                      <option value="Alexandria">Alexandria</option>
                      <option value="Giza">Giza</option>
                      <option value="Aswan">Aswan</option>
                      <option value="Luxor">Luxor</option>
                      <option value="Minya">Minya</option>
                      <option value="Ismailia">Ismailia</option>
                      <option value="Suez">Suez</option>
                      <option value="Fayoum">Fayoum</option>
                      <option value="Menoufia">Menoufia</option>
                    </select>
                    <AlertMessage formik={formik} field="city" />
                  </div>
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone-input-3"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <button
                        className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <svg
                          className="me-2 h-4 w-6"
                          viewBox="0 0 640 480"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fillRule="evenodd">
                            <path fill="#ce1126" d="M0 0h640v160H0z" />
                            <path fill="#fff" d="M0 160h640v160H0z" />
                            <path fill="#000" d="M0 320h640v160H0z" />
                          </g>
                          <image
                            href="https://upload.wikimedia.org/wikipedia/commons/f/fe/Coat_of_arms_of_Egypt_%28Official%29.svg"
                            x="270"
                            y="180"
                            height="120"
                            width="100"
                          />
                        </svg>
                        +20
                      </button>
                      <div className="relative w-full">
                        <input
                          name="phone"
                          id="phone-input-3" // Added id for label association
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          type="tel"
                          className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                          placeholder="123-456-7890"
                        />
                      </div>
                    </div>
                    <AlertMessage formik={formik} field="phone" />
                  </div>

                  {/* Details/Address */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="details"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Delivery Address Details
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details}
                      rows="3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="e.g., Apartment 123, Building A, Near XYZ Landmark"
                    ></textarea>
                    <AlertMessage formik={formik} field="details" />
                    {/* The "Add new address" button was inside this div,
                    but it makes more sense as a separate action or part of the form submission.
                    For simplicity, I've commented out the original button and added the text area.
                    If "Add new address" is meant to add another address input, it would require
                    more complex state management. */}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                {/* Payment Options */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Credit Card Option */}

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="credit-card"
                          aria-describedby="credit-card-text"
                          type="radio"
                          name="payment-method"
                          value="credit-card" // Added value;
                          onChange={() => setPay("credit-card")} // Update state on change
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600  focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600 border-"
                          defaultChecked // Keeps this as the default selected
                        />
                      </div>
                      <div className="ms-4 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="70"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
                          <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
                        </svg>

                        <label
                          htmlFor="credit-card"
                          className="font-medium leading-none text-gray-900 dark:text-white ms-1"
                        >
                          Credit Card
                        </label>

                        <p
                          id="credit-card-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          Pay with your credit card
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment on Delivery Option */}

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="pay-on-delivery"
                          aria-describedby="pay-on-delivery-text"
                          type="radio"
                          name="payment-method"
                          // value="cashOnDelivery" // Added value
                          value="cashOnDelivery"
                          onChange={() => setPay("cashOnDelivery")} // Update state on change
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600  focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                      </div>
                      <div className="ms-4 text-sm">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink" /* Changed from xmlns:xlink to xmlnsXlink */
                          height="70px"
                          viewBox="0 0 452 357"
                          preserveAspectRatio="xMidYMid meet"
                          role="img"
                          aria-labelledby="cashOnDeliveryTitle"
                        >
                          <title id="cashOnDeliveryTitle">
                            Cash on Delivery Icon
                          </title>
                          <g
                            transform="translate(0,357) scale(0.1,-0.1)"
                            fill="currentColor"
                            stroke="none"
                          >
                            <path d="M2930 2955 c-77 -14 -399 -66 -977 -158 -370 -59 -379 -63 -370 -127 29 -202 119 -725 127 -739 5 -11 18 -22 27 -25 10 -3 220 28 468 69 474 78 475 78 475 130 0 25 -29 55 -53 55 -9 0 -198 -29 -418 -66 -221 -36 -402 -64 -403 -62 -1 2 -8 37 -14 78 -6 41 -28 175 -48 298 -20 123 -33 226 -30 229 7 7 1216 203 1255 203 15 0 21 -26 45 -182 16 -101 31 -195 33 -210 5 -28 5 -28 -52 -28 -58 0 -239 -49 -282 -76 -20 -13 -23 -23 -23 -82 1 -37 7 -84 14 -105 16 -43 61 -106 83 -114 8 -3 69 7 136 22 98 22 136 27 200 22 75 -5 84 -9 193 -72 63 -36 154 -81 203 -100 126 -48 153 -49 174 -7 31 60 207 540 207 563 0 40 -13 49 -120 88 -85 32 -114 49 -177 102 -177 151 -242 193 -360 232 -61 20 -120 37 -130 37 -11 0 -28 9 -38 20 -21 23 -40 23 -145 5z m261 -166 c35 -12 80 -29 99 -39 35 -18 175 -124 254 -192 l39 -34 -77 -204 c-43 -113 -81 -209 -86 -214 -5 -5 -47 14 -97 42 -87 50 -90 51 -193 57 -91 5 -118 3 -203 -18 -93 -23 -98 -24 -107 -6 -6 10 -10 31 -10 47 0 28 4 32 65 51 45 15 90 21 154 21 100 0 136 10 145 38 4 11 -9 118 -29 239 -19 121 -35 223 -35 226 0 11 12 9 81 -14z m576 -353 c3 -3 -153 -416 -159 -422 -5 -5 -78 24 -78 31 0 5 151 408 156 417 3 5 70 -16 81 -26z" />
                            <path d="M2338 2656 c-127 -35 -200 -164 -164 -291 32 -109 114 -169 231 -170 58 0 78 4 116 27 128 76 158 246 61 358 -62 73 -154 101 -244 76z m136 -132 c46 -35 60 -99 31 -154 -44 -86 -163 -80 -210 10 -19 37 -19 63 0 101 35 66 120 86 179 43z" />
                            <path d="M1880 1807 l-25 -13 -3 -366 c-2 -398 -3 -398 53 -398 54 0 55 4 55 351 l0 319 118 0 119 0 7 -192 c7 -207 10 -220 60 -220 15 0 44 11 66 26 22 14 43 26 47 26 4 0 31 -12 60 -27 43 -23 56 -26 80 -17 l28 9 3 198 2 197 120 0 120 0 0 -379 c0 -332 2 -382 16 -395 19 -19 54 -21 77 -3 16 11 17 47 15 442 l-3 429 -25 13 c-36 18 -954 18 -990 0z m550 -176 c0 -32 3 -86 6 -119 l7 -61 -32 12 c-23 8 -38 9 -61 0 l-30 -11 0 119 0 119 55 0 55 0 0 -59z" />
                            <path d="M1397 1132 c-15 -17 -17 -58 -17 -385 0 -319 2 -368 16 -381 13 -13 42 -16 164 -16 142 0 150 1 164 22 9 12 16 37 16 55 0 18 2 33 4 33 2 0 125 -25 273 -55 147 -30 279 -55 293 -55 41 0 465 138 635 207 138 56 169 74 230 125 38 33 78 74 88 91 33 60 17 119 -48 176 -48 42 -86 41 -183 -8 -49 -24 -120 -48 -197 -65 -66 -15 -128 -30 -137 -32 -13 -4 -19 3 -24 23 -11 41 -101 133 -131 133 -13 0 -87 -16 -163 -35 -114 -29 -157 -35 -242 -35 -100 0 -105 1 -250 56 l-148 57 0 33 c0 21 -8 42 -20 54 -18 18 -33 20 -163 20 -127 0 -146 -2 -160 -18z m223 -387 l0 -286 -62 3 -63 3 -3 283 -2 282 65 0 65 0 0 -285z m269 115 c130 -50 131 -50 248 -50 102 0 134 4 251 36 132 35 135 35 154 17 10 -11 20 -32 21 -47 2 -27 -2 -30 -83 -57 -46 -16 -125 -34 -174 -41 -94 -12 -126 -29 -126 -68 0 -23 33 -60 55 -60 86 0 397 82 435 115 8 7 87 29 175 50 101 24 184 50 226 71 50 25 69 30 78 21 17 -17 15 -20 -45 -72 -74 -63 -257 -140 -563 -236 l-230 -72 -238 47 c-131 26 -259 52 -285 58 l-48 10 0 164 c0 92 4 164 9 164 5 0 68 -22 140 -50z" />
                          </g>
                        </svg>
                        <label
                          htmlFor="pay-on-delivery"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          Payment on delivery
                        </label>
                        <p
                          id="pay-on-delivery-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          +$15 payment processing fee
                        </p>
                      </div>
                    </div>
                    {/* <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        Delete
                      </button>
                      <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        Edit
                      </button>
                    </div> */}
                  </div>

                  {/* Apple Pay Account Option */}

                  {/* <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="applePay-2"
                          aria-describedby="applePay-text"
                          type="radio"
                          name="payment-method"
                          value="applePay" // Added value
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600  focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                      </div>
                      <div className="ms-4 text-sm">
                        <svg
                          fill="#000000"
                          width="120px"
                          viewBox="0 -34.55 120.3 120.3"
                          xmlns="http://www.w3.org/2000/svg"
                          className="flex justify-center items-center h-20 w-20"
                        >
                          <path d="M22.8 6.6c1.4-1.8 2.4-4.2 2.1-6.6-2.1.1-4.6 1.4-6.1 3.1-1.3 1.5-2.5 4-2.2 6.3 2.4.3 4.7-1 6.2-2.8M24.9 10c-3.4-.2-6.3 1.9-7.9 1.9-1.6 0-4.1-1.8-6.8-1.8-3.5.1-6.7 2-8.5 5.2-3.6 6.3-1 15.6 2.6 20.7 1.7 2.5 3.8 5.3 6.5 5.2 2.6-.1 3.6-1.7 6.7-1.7s4 1.7 6.8 1.6 4.6-2.5 6.3-5.1c2-2.9 2.8-5.7 2.8-5.8-.1-.1-5.5-2.1-5.5-8.3-.1-5.2 4.2-7.7 4.4-7.8-2.3-3.6-6.1-4-7.4-4.1" />

                          <g>
                            <path d="M54.3 2.9c7.4 0 12.5 5.1 12.5 12.4 0 7.4-5.2 12.5-12.7 12.5H46v12.9h-5.9V2.9h14.2zm-8.3 20h6.7c5.1 0 8-2.8 8-7.5 0-4.8-2.9-7.5-8-7.5h-6.8v15h.1zM68.3 33c0-4.8 3.7-7.8 10.3-8.2l7.6-.4v-2.1c0-3.1-2.1-4.9-5.5-4.9-3.3 0-5.3 1.6-5.8 4h-5.4c.3-5 4.6-8.7 11.4-8.7 6.7 0 11 3.5 11 9.1v19h-5.4v-4.5h-.1c-1.6 3.1-5.1 5-8.7 5-5.6 0-9.4-3.4-9.4-8.3zm17.9-2.5v-2.2l-6.8.4c-3.4.2-5.3 1.7-5.3 4.1 0 2.4 2 4 5 4 4 0 7.1-2.7 7.1-6.3zM96.9 51v-4.6c.4.1 1.4.1 1.8.1 2.6 0 4-1.1 4.9-3.9 0-.1.5-1.7.5-1.7l-10-27.6h6.1l7 22.5h.1l7-22.5h6L110 42.4c-2.4 6.7-5.1 8.8-10.8 8.8-.4-.1-1.8-.1-2.3-.2z" />
                          </g>
                        </svg>
                        <label
                          htmlFor="applePay-2"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          Apple Pay
                        </label>
                        <p
                          id="applePay-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          Connect to your account
                        </p>
                      </div>
                    </div>
  
                  </div> */}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full flex-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Summary
                </h3>
                <div className="rounded-lg border border-black bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 ">
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      <li className="flex items-center justify-between py-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Products
                        </p>
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ${originalPrice}
                        </p>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Shipping
                        </p>
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          Free
                        </p>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Taxes
                        </p>
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          Free
                        </p>
                      </li>
                      <li className="flex items-center justify-between py-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Discount
                        </p>
                        <p className="text-base font-bold text-primary dark:text-primary">
                          -${discount}
                        </p>
                      </li>
                      <li className="flex items-center justify-between pt-4">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          Total
                        </p>
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ${total}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="flex w-full items-center cursor-pointer justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
