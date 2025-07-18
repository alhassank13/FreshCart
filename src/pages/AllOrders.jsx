import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function AllOrders() {
  // Scroll to top with smooth animation on component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // IMPORTANT: For this component to work with actual user orders,
  // the userId MUST be dynamically retrieved from your application's
  // authentication system (e.g., from localStorage after user login,
  // or from a global authentication context).
  // The current value below is a placeholder for demonstration purposes.
  const userId = localStorage.getItem("userId"); // This is how you'd typically get it
//   const userId = "6867ddaa07d9989f30fe0a77"; // Current placeholder userId

  // Use useQuery to fetch user orders
  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userOrders", userId], // Unique key for this query
    queryFn: async ({ queryKey }) => {
      const fetchedUserId = queryKey[1];
      if (!fetchedUserId) {
        // If userId is not available, throw an error to prevent the query from running
        throw new Error("User ID not available to fetch orders.");
      }
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${fetchedUserId}`
      );
      return response.data; // axios.data directly contains the array of orders
    },
    // Only run the query if userId is available (and not null/undefined)
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 60, // Data stays in cache for 1 hour
  });

  // Log the raw data from react-query to inspect its structure
  // Open your browser's developer console to see this output.
  console.log("Raw ordersData from react-query:", ordersData);

  // FIX: Access the orders directly from ordersData, as it's already the array.
  const orders = ordersData;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-pulse bg-gray-200 h-8 w-1/4 rounded"></h2>
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md animate-pulse"
            >
              <div className="h-6 bg-gray-200 w-3/4 mb-4 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                    <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                    <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        <h2 className="text-3xl font-bold mb-4">Error Loading Orders</h2>
        <p className="text-lg">
          {error?.message ||
            "Failed to fetch your orders. Please try again later."}
        </p>
      </div>
    );
  }

  // Handle no orders found
  // Check if orders is an array and if it has a length property
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        <h2 className="text-3xl font-bold mb-4">No Orders Found</h2>
        <p className="text-lg">
          It looks like you haven't placed any orders yet.
        </p>
        <p className="text-md mt-2">
          Start shopping by exploring our{" "}
          <a href="/" className="text-blue-600 hover:underline">
            products
          </a>
          !
        </p>
      </div>
    );
  }

  return (
    <div className="dark:bg-slate-400">
       <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders </h2>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-600">
            Total Orders: <span className="font-normal text-green-600">{orders.length}</span>
          </h3>
        </div>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 dark:bg-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Order ID:{" "}
                  <span className="font-normal text-gray-700">{order._id}</span>
                </h3>
                <p className="text-sm text-gray-500">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  ${order.totalOrderPrice?.toFixed(2)}
                </p>
                <span className="text-sm text-gray-500">Total Price</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Products:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md shadow-sm"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                    />
                    <div className="flex-1">
                      <p className="text-md font-medium text-gray-800">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.count}
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Price: ${(item.price * item.count).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-700">
              <p>
                Payment Method:{" "}
                <span className="font-medium">{order.paymentMethodType}</span>
              </p>
              <p>
                Is Paid:{" "}
                <span
                  className={`font-medium ${
                    order.isPaid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {order.isPaid ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Is Delivered:{" "}
                <span
                  className={`font-medium ${
                    order.isDelivered ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {order.isDelivered ? "Yes" : "No"}
                </span>
              </p>
              {order.shippingAddress && (
                <div className="mt-2">
                  <h5 className="font-semibold">Shipping Address:</h5>
                  <p>
                    {order.shippingAddress.details},{" "}
                    {order.shippingAddress.city}
                  </p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
}
